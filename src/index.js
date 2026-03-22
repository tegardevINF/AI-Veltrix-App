"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const systemPrompt_1 = require("./systemPrompt");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Main chat endpoint
app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }
    // Ensure SYSTEM_PROMPT is at the beginning
    const groqMessages = [
        { role: 'system', content: systemPrompt_1.SYSTEM_PROMPT },
        ...messages
    ];
    try {
        const response = await fetch(`${process.env.GROQ_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
                messages: groqMessages,
                tools: [{ type: "browser_search" }],
                tool_choice: "auto",
                temperature: Number(process.env.LLM_TEMPERATURE) || 0.7,
                max_tokens: Number(process.env.LLM_MAX_TOKENS) || 8192,
                top_p: Number(process.env.LLM_TOP_P) || 0.9,
            })
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error('Groq API Error:', errorData);
            return res.status(response.status).json({ error: 'Failed to communicate with Groq API', details: errorData });
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal server error', details: String(error) });
    }
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'AI Veltrix backend is running' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
//# sourceMappingURL=index.js.map