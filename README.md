<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0a0f,50:1a0533,100:8B5CF6&height=220&section=header&text=🤖%20AI-Veltrix&fontSize=65&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Next-Gen%20AI%20Assistant%20%7C%20Groq%20120B%20%2B%20Local%20LLM&descAlignY=57&descSize=17&descColor=d8b4fe" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1200&color=A78BFA&center=true&vCenter=true&width=600&lines=Hybrid+Cloud+%2B+Local+AI+Intelligence+%F0%9F%A7%A0;Auto+Fallback+in+%3C500ms+%E2%9A%A1;Never+leave+a+user+waiting+%F0%9F%9B%A1%EF%B8%8F;TypeScript+%7C+Node.js+%7C+React+%7C+SQLite" alt="Typing SVG" />

<br/>

[![Stars](https://img.shields.io/github/stars/tegardevINF/AI-Veltrix-App?style=for-the-badge&logo=github&color=8B5CF6&labelColor=0a0a0f)](https://github.com/tegardevINF/AI-Veltrix-App/stargazers)
[![Forks](https://img.shields.io/github/forks/tegardevINF/AI-Veltrix-App?style=for-the-badge&logo=github&color=8B5CF6&labelColor=0a0a0f)](https://github.com/tegardevINF/AI-Veltrix-App/network)
[![Issues](https://img.shields.io/github/issues/tegardevINF/AI-Veltrix-App?style=for-the-badge&logo=github&color=FF6B6B&labelColor=0a0a0f)](https://github.com/tegardevINF/AI-Veltrix-App/issues)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge&logo=opensourceinitiative&labelColor=0a0a0f)](LICENSE)

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0a0a0f)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=0a0a0f)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-ffffff?style=for-the-badge&logo=express&logoColor=black&labelColor=0a0a0f)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0a0a0f)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=0a0a0f)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=for-the-badge&logo=sqlite&logoColor=white&labelColor=0a0a0f)](https://www.sqlite.org/)

</div>

---

## 📋 Daftar Isi

<details>
<summary><b>📑 Klik untuk lihat semua section</b></summary>

| No | Section |
|----|---------|
| 1 | [🧠 Tentang Project](#-tentang-project) |
| 2 | [✨ Fitur Lengkap](#-fitur-lengkap) |
| 3 | [🏗️ Arsitektur Sistem](#️-arsitektur-sistem) |
| 4 | [🛠️ Technology Stack](#️-technology-stack) |
| 5 | [📁 Struktur Project](#-struktur-project) |
| 6 | [⚙️ Cara Instalasi](#️-cara-instalasi) |
| 7 | [🔧 Konfigurasi](#-konfigurasi) |
| 8 | [📡 API Reference](#-api-reference) |
| 9 | [🎨 Cara Kerja UI](#-cara-kerja-ui) |
| 10 | [🧠 Cara Kerja AI](#-cara-kerja-ai) |
| 11 | [🗄️ Database Schema](#️-database-schema) |
| 12 | [🔄 Fallback Logic](#-fallback-logic) |
| 13 | [📊 Performance & Benchmark](#-performance--benchmark) |
| 14 | [❌ Error Handling](#-error-handling) |
| 15 | [🚀 Deploy](#-deploy) |
| 16 | [🤝 Kontribusi](#-kontribusi) |
| 17 | [❓ FAQ & Troubleshooting](#-faq--troubleshooting) |

</details>

---

## 🧠 Tentang Project

**AI-Veltrix** adalah asisten AI *high availability* yang menggabungkan dua model secara cerdas:

- **Groq GPT-OSS 120B** — 120 miliar parameter, reasoning setara GPT-4, 128K context window
- **Local LLM 3B** — Backup andalan yang jalan di laptop biasa, tanpa internet

> *"Reliability through redundancy — never leave a user waiting."*

| Masalah | Solusi AI-Veltrix |
|---|---|
| Rate limit Groq (30 RPM, 8K TPM) | Auto fallback ke Local LLM |
| Groq API down | Switch otomatis dalam <500ms |
| Token limit 8,192 per response | Split atau pakai local |
| Tidak ada internet | Local LLM tetap jalan |
| Mahalnya API | Groq & Local LLM gratis |

---

## 🖥️ UI Preview

<div align="center">

<img src="https://github.com/tegardevINF/AI-Veltrix-App/blob/main/assets/screenshot.png?raw=true" width="100%" alt="AI-Veltrix UI Preview" />

</div>

---

## ✨ Fitur Lengkap

### 🤖 1. Dual AI Models

| Fitur | Groq 120B | Local 3B |
|---|---|---|
| **Model** | GPT-OSS 120B | Llama 3.2 3B |
| **Parameter** | 120 Miliar | 3 Miliar |
| **Context Window** | 128,000 token | 4,000 token |
| **Reasoning** | Chain of Thought, Tree of Thought | Basic reasoning |
| **Coding** | Full-stack, optimization, review | Simple functions |
| **Web Search** | ✅ Built-in | ✅ Tavily API |
| **Function Calling** | ✅ | ❌ |
| **Kecepatan** | 1.2–2.5s | 3–8s |
| **Biaya** | Gratis | Gratis |

### 🌐 2. Web Search Integration

```yaml
Groq:
  method: browser_search (built-in)
  verification: Multi-source
  cost: Free

Local:
  method: Tavily API
  verification: Single source
  cost: 1,000 free/month
```

### 💾 3. Memory & Persistence

```sql
messages   → Semua percakapan dengan timestamp
sessions   → Setiap sesi chat
users      → Profil dan preferensi
memories   → Pengetahuan jangka panjang
feedbacks  → Koreksi dan rating user
```

### 🎨 4. User Interface

| Komponen | Fitur |
|---|---|
| **Sidebar** | Collapse, history chat, settings |
| **Chat Area** | Markdown, code highlight, tabel |
| **Artifact Viewer** | Preview kode, copy, download |
| **Input Area** | Auto-resize, send button, action buttons |
| **Dark Mode** | Toggle dark/light |

### 🔒 5. Security & Privacy

- Semua API key di `.env` — tidak pernah di-commit ke Git
- **Force Local** toggle untuk query sensitif — bypass Groq sepenuhnya
- Helmet.js untuk HTTP security headers

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────┐
│              PRESENTATION LAYER                  │
│   React 18 + Tailwind CSS + Vite                 │
│   Sidebar │ ChatArea │ Message │ ArtifactViewer  │
└───────────────────────┬─────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│                 API GATEWAY                      │
│   Express.js + TypeScript                        │
│   POST /api/chat  │  GET /api/health             │
│   Rate Limiter  │  CORS  │  Helmet               │
└──────────┬──────────────┬───────────┬────────────┘
           │              │           │
           ▼              ▼           ▼
┌─────────────┐  ┌──────────────┐  ┌─────────────┐
│ GROQ SERVICE│  │  LOCAL LLM   │  │   MEMORY    │
│ GPT-OSS 120B│  │ Llama 3.2 3B │  │   SQLite    │
│ 128K context│  │ 4K context   │  │ Vector Srch │
│ 30 RPM/8K  │  │ Unlimited    │  │ Sessions    │
└─────────────┘  └──────────────┘  └─────────────┘
```

**Sequence: Request Flow**

```
Client → POST /chat → Save User Msg → DB
                    → Try Groq
                        ↓ Success → Return response
                        ↓ Error/429 → Retry 3x (backoff)
                        ↓ Still fail → Fallback Local LLM
                                           ↓ (Web Search via Tavily if needed)
                                           ↓ Return response → Save to DB → Client
```

---

## 🛠️ Technology Stack

**Backend**

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x | Runtime |
| TypeScript | 5.0 | Language |
| Express | 4.18 | Framework |
| SQLite (better-sqlite3) | 3.x | Database |
| dotenv | 16.x | Env vars |
| cors | 2.8 | CORS |
| helmet | 7.1 | Security |
| morgan | 1.10 | Logger |

**AI/ML**

| Service | Model | Setup |
|---|---|---|
| Groq | GPT-OSS 120B | [console.groq.com](https://console.groq.com) |
| Local LLM | Llama 3.2 3B | `ollama pull llama3.2:3b` |
| Web Search | Tavily API | [app.tavily.com](https://app.tavily.com) |

**Frontend**

| Technology | Version |
|---|---|
| React | 18.2 |
| TypeScript | 5.0 |
| Tailwind CSS | 3.4 |
| Vite | 5.0 |
| Lucide React | 0.294 |
| Marked | 11.0 |

---

## 📁 Struktur Project

```
AI-Veltrix-App/
│
├── src/
│   ├── prompts/
│   │   ├── groqSystemPrompt.ts        # System prompt utama (1.577 baris)
│   │   │   ├── Identity & Persona       (200 lines)
│   │   │   ├── Reasoning Strategies     (150 lines)
│   │   │   ├── Coding Guidelines        (150 lines)
│   │   │   ├── Web Search Protocol      (100 lines)
│   │   │   ├── Response Formats         (200 lines)
│   │   │   ├── Memory Management        (150 lines)
│   │   │   ├── Examples                 (300 lines)
│   │   │   ├── Meta-cognition           (150 lines)
│   │   │   └── Safety & Ethics          (100 lines)
│   │   └── localSystemPrompt.ts       # Versi ringan (300 baris)
│   │
│   ├── services/
│   │   ├── groqService.ts             # Groq API + browser_search + rate limit
│   │   ├── localLLMService.ts         # LM Studio/Ollama + Tavily API
│   │   ├── llmService.ts              # Smart fallback routing
│   │   └── memoryService.ts           # SQLite CRUD + semantic search
│   │
│   ├── components/
│   │   ├── Sidebar.tsx                # History, settings, new chat
│   │   ├── ChatArea.tsx               # Messages list + auto-scroll
│   │   ├── Message.tsx                # Markdown + code highlight
│   │   ├── InputArea.tsx              # Auto-resize textarea
│   │   ├── ArtifactViewer.tsx         # Code preview + copy + download
│   │   └── TypingIndicator.tsx        # 3 dots animation
│   │
│   ├── hooks/
│   │   ├── useChat.ts                 # Chat state management
│   │   ├── useLocalStorage.ts         # Persistent browser storage
│   │   └── useWebSearch.ts            # Web search toggle
│   │
│   ├── types/index.ts                 # Message, Session, User, Memory, Feedback
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── tokenCounter.ts
│   │   ├── rateLimiter.ts
│   │   └── validator.ts
│   │
│   ├── db.ts                          # SQLite init, query, close
│   ├── index.ts                       # Express entry + middleware + routes
│   ├── App.tsx                        # React root component
│   └── main.tsx                       # Frontend entry point
│
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## ⚙️ Cara Instalasi

**Prerequisites**

| Requirement | Install | Check |
|---|---|---|
| Node.js 20+ | [nodejs.org](https://nodejs.org) | `node --version` |
| npm 9+ | Bawaan Node.js | `npm --version` |
| Git | [git-scm.com](https://git-scm.com) | `git --version` |
| Groq API Key | [console.groq.com](https://console.groq.com) | — |

<details>
<summary><b>🪟 Windows</b></summary>

```powershell
# Clone repository
git clone https://github.com/tegardevINF/AI-Veltrix-App.git
cd AI-Veltrix-App

# Install dependencies
npm install
cd frontend-claude-app && npm install && cd ..

# Setup environment
copy .env.example .env
notepad .env   # isi GROQ_API_KEY

# (Opsional) Local LLM via Ollama
# Download dari https://ollama.com/download/windows
ollama pull llama3.2:3b
ollama serve

# Jalankan
npm run dev
# Buka http://localhost:3005
```

</details>

<details>
<summary><b>🍎 macOS / 🐧 Linux</b></summary>

```bash
# Clone repository
git clone https://github.com/tegardevINF/AI-Veltrix-App.git
cd AI-Veltrix-App

# Install Node.js via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20 && nvm use 20

# Install dependencies
npm install
cd frontend-claude-app && npm install && cd ..

# Setup environment
cp .env.example .env
nano .env   # isi GROQ_API_KEY, Ctrl+X Y Enter

# (Opsional) Local LLM via Ollama
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b

# Jalankan
npm run dev                              # Backend → port 3005
cd frontend-claude-app && npm run dev   # Frontend
```

</details>

---

## 🔧 Konfigurasi

```env
# ── SERVER ──────────────────────────────────────
PORT=3005
NODE_ENV=development

# ── GROQ API ─────────────────────────────────────
# Dapatkan dari https://console.groq.com
GROQ_API_KEY=gsk_your_key_here
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=openai/gpt-oss-120b
GROQ_FALLBACK_MODEL=llama-3.3-70b-versatile

# ── LOCAL LLM ────────────────────────────────────
LLM_BASE_URL=http://127.0.0.1:1234/v1
LLM_MODEL=llama-3.2-3b-instruct
LLM_FALLBACK_ENABLED=true

# ── WEB SEARCH (opsional) ────────────────────────
# Dapatkan dari https://app.tavily.com
TAVILY_API_KEY=tvly_your_key_here

# ── MODEL PARAMETERS ─────────────────────────────
LLM_TEMPERATURE=0.6
LLM_TOP_P=0.85
LLM_TOP_K=40
LLM_REPETITION_PENALTY=1.15
LLM_MAX_TOKENS=6000

# ── RATE LIMITING ────────────────────────────────
REQUEST_DELAY_MS=2000
MAX_RETRIES=3
RETRY_BASE_DELAY_MS=1000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=25

# ── TOKEN MANAGEMENT ─────────────────────────────
MAX_TOTAL_TOKENS=15000
SYSTEM_PROMPT_TOKEN_BUDGET=5000
HISTORY_TOKEN_BUDGET=2000
RESPONSE_TOKEN_BUDGET=6000

# ── LOGGING ──────────────────────────────────────
LOG_LEVEL=info
```

---

## 📡 API Reference

### `POST /api/chat`

```bash
curl -X POST http://localhost:3005/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Apa itu machine learning?",
    "useWebSearch": false,
    "forceLocal": false
  }'
```

**Response sukses:**
```json
{
  "success": true,
  "data": {
    "content": "Machine learning adalah...",
    "source": "groq",
    "model": "openai/gpt-oss-120b",
    "latency_ms": 1234,
    "usage": {
      "prompt_tokens": 150,
      "completion_tokens": 200,
      "total_tokens": 350
    }
  }
}
```

**Response rate limit:**
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please wait 60 seconds.",
  "retryAfter": 60
}
```

### `GET /api/health`

```bash
curl http://localhost:3005/api/health
```

```json
{
  "status": "ok",
  "timestamp": "2025-03-23T10:00:00.000Z",
  "config": {
    "groq_model": "openai/gpt-oss-120b",
    "local_model": "llama-3.2-3b-instruct",
    "environment": "development"
  }
}
```

---

## 🎨 Cara Kerja UI

```tsx
// Sidebar.tsx — open/close + load history dari localStorage
// ChatArea.tsx — useRef scroll + useEffect auto-scroll + typing indicator
// Message.tsx  — conditional class user/ai + Markdown via marked.js + code highlight Prism.js
// InputArea.tsx — useState + auto-resize height onChange + Enter to send
// ArtifactViewer.tsx — code preview + syntax highlight + copy button
```

---

## 🧠 Cara Kerja AI

**Groq Service (`groqService.ts`)**
```typescript
// 1. Terima messages dari user
// 2. Inject system prompt (1.577 baris)
// 3. Tambah browser_search tool jika enabled
// 4. Kirim ke Groq API → handle response
// 5. Return ke fallback logic
```

**Local LLM Service (`localLLMService.ts`)**
```typescript
// 1. Terima messages dari user
// 2. Sederhanakan history (max 10 pesan) → fit 4K context
// 3. Inject system prompt versi ringan
// 4. Kirim ke LM Studio/Ollama
// 5. Jika butuh web search → panggil Tavily API
// 6. Return ke fallback logic
```

**System Prompt Structure (`groqSystemPrompt.ts` — 1.577 baris)**

| Section | Lines |
|---|---|
| Identity & Persona | 200 |
| Capabilities | 300 |
| Rules & Guidelines | 400 |
| Examples | 300 |
| Memory System | 200 |
| Advanced Features | 177 |

---

## 🗄️ Database Schema

```sql
CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    session_id TEXT,
    role TEXT,           -- 'user' | 'assistant'
    content TEXT,
    embedding TEXT,      -- untuk vector search
    created_at DATETIME
);

CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT,
    summary TEXT,
    created_at DATETIME
);

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    preferences TEXT     -- JSON
);

CREATE TABLE memories (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    type TEXT,
    content TEXT,
    embedding TEXT,
    importance INTEGER
);

CREATE TABLE feedbacks (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    message_id TEXT,
    rating INTEGER,
    feedback_text TEXT
);
```

**Query examples:**
```typescript
// Simpan pesan
db.prepare(`INSERT INTO messages (id, session_id, role, content, created_at)
            VALUES (?, ?, ?, ?, ?)`).run(id, sessionId, role, content, timestamp);

// Ambil history
db.prepare(`SELECT * FROM messages WHERE session_id = ?
            ORDER BY created_at DESC LIMIT 20`).all(sessionId);
```

---

## 🔄 Fallback Logic

```typescript
class LLMService {
  private consecutiveFailures = 0;
  private maxFailuresBeforeFallback = 2;

  async chat(messages: Message[], options?: ChatOptions) {
    // Force local jika diminta user
    if (options?.forceLocal) {
      return await this.localLLM.chat(messages);
    }

    // Sudah gagal 2x → pakai local
    if (this.consecutiveFailures >= this.maxFailuresBeforeFallback) {
      return await this.localLLM.chat(messages);
    }

    // Coba Groq dulu
    try {
      const result = await this.groq.chat(messages, options);
      this.consecutiveFailures = 0; // reset
      return result;
    } catch (error) {
      this.consecutiveFailures++;
      return await this.localLLM.chat(messages); // fallback
    }
  }
}
```

**Trigger Conditions:**

| Kondisi | Aksi |
|---|---|
| Groq returns 429 | Retry 3x with backoff → fallback |
| Groq returns 5xx | Immediate fallback |
| Network timeout >30s | Immediate fallback |
| 2+ consecutive failures | Force local sampai reset |
| `forceLocal: true` | Bypass Groq sepenuhnya |

---

## 📊 Performance & Benchmark

**Response Times:**

| Operation | Groq p50 | Groq p99 | Local p50 | Local p99 |
|---|---|---|---|---|
| Simple Query | 800ms | 1.2s | 1.5s | 3s |
| Complex Reasoning | 1.5s | 2.5s | 4s | 8s |
| Code Generation | 1.2s | 2s | 3s | 6s |
| Web Search | 1.8s | 3s | 2.5s | 5s |

**Rate Limits:**

| Model | RPM | TPM |
|---|---|---|
| Groq GPT-OSS 120B | 30 | 8,000 |
| Groq + Fallback | ∞ | ∞ |
| Local LLM | ∞ | ∞ |

**Token Usage:**

| Scenario | Input | Output | Total |
|---|---|---|---|
| Simple Question | 50–200 | 100–300 | 150–500 |
| Code Generation | 200–500 | 500–1,500 | 700–2,000 |
| Document Analysis | 1,000–5,000 | 500–1,000 | 1,500–6,000 |
| Complex Reasoning | 500–1,500 | 1,000–3,000 | 1,500–4,500 |

---

## ❌ Error Handling

**Error Types:**

| Code | Type | Deskripsi | Solusi |
|---|---|---|---|
| 400 | Bad Request | Message kosong | Pastikan message tidak kosong |
| 429 | Rate Limit | Terlalu banyak request | Kurangi frekuensi / aktifkan fallback |
| 500 | Internal Error | Server error | Cek logs, restart server |
| 503 | Unavailable | Groq down | Auto fallback ke local |
| ECONNREFUSED | Connection | Local LLM tidak jalan | Jalankan `ollama serve` |
| ETIMEDOUT | Timeout | Request terlalu lama | Cek koneksi internet |

**Logging:**
```typescript
const log = {
  info:  (msg) => console.log(`[INFO]  ${new Date().toISOString()} ${msg}`),
  warn:  (msg) => console.warn(`[WARN]  ${new Date().toISOString()} ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} ${msg}`),
  debug: (msg) => process.env.LOG_LEVEL === 'debug' && console.debug(`[DEBUG] ${msg}`)
};
```

---

## 🚀 Deploy

**Production Build:**
```bash
npm run build
npm start

# Atau pakai PM2 untuk keep-alive
npm install -g pm2
pm2 start dist/index.js --name ai-veltrix
pm2 save && pm2 startup
```

**Docker:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3005
CMD ["npm", "start"]
```

```bash
docker build -t ai-veltrix .
docker run -p 3005:3005 --env-file .env ai-veltrix
```

**Frontend (Vercel):**
```bash
npm install -g vercel
vercel
```

---

## 🤝 Kontribusi

```bash
# 1. Fork repo ini
# 2. Clone fork kamu
git clone https://github.com/username/AI-Veltrix-App.git
cd AI-Veltrix-App

# 3. Buat branch baru
git checkout -b feature/nama-fitur

# 4. Buat perubahan, lalu test
npm run test
npm run lint

# 5. Commit & push
git commit -m "feat: deskripsi fitur"
git push origin feature/nama-fitur

# 6. Buka Pull Request di GitHub
```

**Commit Convention:**

| Type | Deskripsi | Contoh |
|---|---|---|
| `feat` | Fitur baru | `feat: add web search toggle` |
| `fix` | Bug fix | `fix: rate limit error handling` |
| `docs` | Dokumentasi | `docs: update README` |
| `refactor` | Refactoring | `refactor: simplify fallback logic` |
| `test` | Testing | `test: add unit tests` |
| `chore` | Maintenance | `chore: update dependencies` |

---

## ❓ FAQ & Troubleshooting

**Q: Error `GROQ_API_KEY not found`**

A: Pastikan file `.env` ada dan berisi key yang valid.
```bash
cp .env.example .env
# Edit .env → isi GROQ_API_KEY=gsk_xxxxxxxx
```

**Q: Error `Rate limit exceeded`**

A: Groq free plan limit 30 RPM, 8K TPM. Kurangi frekuensi request atau tunggu 1–2 menit. Fallback ke local LLM akan aktif otomatis.

**Q: Local LLM tidak jalan**

A:
```bash
# Pastikan Ollama sudah running
ollama serve

# Pull model jika belum ada
ollama pull llama3.2:3b

# Test koneksi
curl http://127.0.0.1:1234/v1/models
```

**Q: Web search tidak jalan**

A: Untuk Groq pastikan `useWebSearch: true` di request. Untuk Local, daftar di [app.tavily.com](https://app.tavily.com) dan isi `TAVILY_API_KEY` di `.env`.

**Q: Port 3005 sudah dipakai**

A: Ganti `PORT=3005` ke port lain (misal `3006`) di file `.env`.

**Q: TypeScript build error**

```bash
npm run type-check
# Fix semua error yang muncul
npm run build
```

---

## 📄 License

MIT License © 2025 [Tegar](https://github.com/tegardevINF)

---

<div align="center">

*Built with TypeScript, Node.js, React & Groq API*

<br/>

*"Empowering Intelligence, Anywhere, Anytime."*

<br/>

**⭐ Star this repo if it helped you!**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8B5CF6,50:1a0533,100:0a0a0f&height=120&section=footer" width="100%"/>

</div>
