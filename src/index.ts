import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { SYSTEM_PROMPT } from './systemPrompt';
import { getDb } from './db';
import { llmService } from './services/llmService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Main chat endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<any> => {
  const { messages, conversationId } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const db = await getDb();
  let currentConvId = conversationId;

  if (!currentConvId) {
    currentConvId = crypto.randomUUID();
    let title = messages[0]?.content || 'New Chat';
    if (title.length > 35) title = title.substring(0, 35) + '...';
    await db.run('INSERT INTO conversations (id, title) VALUES (?, ?)', [currentConvId, title]);
  } else {
    await db.run('UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [currentConvId]);
  }

  const lastUserMsg = messages[messages.length - 1];
  await db.run('INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)', [
    crypto.randomUUID(), currentConvId, 'user', lastUserMsg.content
  ]);

  // Token limits (Assuming ~4 chars per token)
  const historyBudgetTokens = Number(process.env.HISTORY_TOKEN_BUDGET) || 3000;
  const historyBudgetChars = historyBudgetTokens * 4;
  let currentChars = 0;
  
  const retainedMessages = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    const msgLength = (msg.content || '').length + (msg.role || '').length;
    if (currentChars + msgLength > historyBudgetChars && retainedMessages.length > 0) {
      break;
    }
    retainedMessages.unshift(msg);
    currentChars += msgLength;
  }

  const groqMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...retainedMessages
  ];

  const startTime = Date.now();
  let llmResponse;

  try {
    const { useWebSearch = true, forceLocal = false } = req.body;
    const requestDelay = Number(process.env.REQUEST_DELAY_MS) || 2000;
    
    if (requestDelay > 0) {
      await new Promise(r => setTimeout(r, requestDelay));
    }
    
    // Call our abstracted LLM Service
    llmResponse = await llmService.chat(groqMessages as any, { useWebSearch, forceLocal });
    
    if (!llmResponse.success) {
      return res.status(500).json({ error: 'LLM service failed' });
    }
  } catch (error: any) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ error: error.message });
  }

  const endTime = Date.now();
  const latency = endTime - startTime;

  if (llmResponse?.content) {
    await db.run('INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)', [
      crypto.randomUUID(), currentConvId, 'assistant', llmResponse.content
    ]);
  }

  // 🔥 TAMPILKAN SUMBER DI RESPONSE dan maintain OpenAI fallback compatibility
  res.json({
    success: true,
    conversationId: currentConvId,
    choices: [{ message: { content: llmResponse.content } }],
    data: {
      content: llmResponse.content,
      source: llmResponse.source,
      model: llmResponse.model,
      latency_ms: latency,
      usage: llmResponse.usage,
    },
  });
});

// Database API endpoints
app.get('/api/conversations', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM conversations ORDER BY updated_at DESC');
    res.json(rows);
  } catch(e) { res.status(500).json({error: String(e)}); }
});

app.get('/api/conversations/:id', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const conversation = await db.get('SELECT * FROM conversations WHERE id = ?', [req.params.id]);
    if (!conversation) return res.status(404).json({ error: 'Not found' });
    const messages = await db.all('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC', [req.params.id]);
    res.json({ ...conversation, messages });
  } catch(e) { res.status(500).json({error: String(e)}); }
});

app.delete('/api/conversations/:id', async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    await db.run('DELETE FROM conversations WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch(e) { res.status(500).json({error: String(e)}); }
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    config: {
      groq_model: process.env.GROQ_MODEL,
      local_model: process.env.LLM_MODEL,
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   🤖 Groq Model: ${process.env.GROQ_MODEL || 'openai/gpt-oss-120b'}`);
  console.log(`   🖥️ Local Model: ${process.env.LLM_MODEL || 'llama-3.2-3b-instruct'}`);
});
