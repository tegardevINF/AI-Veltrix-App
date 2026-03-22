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

## 🧠 About

**AI-Veltrix** adalah asisten AI *high availability* yang menggabungkan dua model secara cerdas:

- **Groq GPT-OSS 120B** — 120 miliar parameter, reasoning setara GPT-4, 128K context window
- **Local LLM 3B** — Backup andalan yang jalan di laptop biasa, tanpa internet

> *"Reliability through redundancy — never leave a user waiting."*

| Masalah | Solusi AI-Veltrix |
|---|---|
| Rate limit Groq (30 RPM) | Auto fallback ke Local LLM |
| Groq API down | Switch otomatis dalam <500ms |
| Tidak ada internet | Local LLM tetap jalan |
| Mahalnya API | Groq & Local LLM gratis |

---

## ✨ Fitur Utama

<table>
<tr>
<td width="50%">

**🤖 Dual AI Models**
- Groq GPT-OSS 120B (cloud)
- Llama 3.2 3B (local)
- Auto fallback & smart routing

**🌐 Web Search**
- Groq: `browser_search` built-in
- Local: Tavily API (1K free/month)

**💾 Persistent Memory**
- Full chat history di SQLite
- Vector search untuk memori jangka panjang
- Session management

</td>
<td width="50%">

**⚡ Performance**
- Groq response: 800ms–2.5s
- Local response: 1.5s–8s
- Retry 3x + exponential backoff

**🎨 Premium UI**
- Glassmorphism design
- Dark / Light mode toggle
- Artifact viewer (preview & copy kode)
- Auto-resize input, Markdown render

**🔒 Privacy**
- Semua API key di `.env` (tidak di-commit)
- Force Local toggle untuk query sensitif

</td>
</tr>
</table>

---

## 🏗️ Arsitektur

```
┌─────────────────────────────────────────────────┐
│              PRESENTATION LAYER                  │
│   React 18 + Tailwind CSS + Vite                 │
│   Sidebar │ ChatArea │ Message │ ArtifactViewer  │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│                 API GATEWAY                      │
│   Express.js + TypeScript                        │
│   POST /api/chat  │  GET /api/health             │
│   Rate Limiter  │  CORS  │  Helmet               │
└─────────────────────────────────────────────────┘
          │                │               │
          ▼                ▼               ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ GROQ SERVICE │  │  LOCAL LLM   │  │    MEMORY    │
│ GPT-OSS 120B │  │ Llama 3.2 3B │  │    SQLite    │
│ 128K context │  │ 4K context   │  │ Vector Search│
│ 30 RPM / 8K  │  │ Unlimited    │  │ Sessions     │
└──────────────┘  └──────────────┘  └──────────────┘
```

**Fallback Logic:**
```
Request → Coba Groq → Gagal 2x? → Fallback ke Local LLM
                ↑                          │
                └──── Reset setelah sukses ┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Language** | TypeScript | 5.0 |
| **Runtime** | Node.js | 20.x |
| **Framework** | Express | 4.18 |
| **Frontend** | React + Vite + Tailwind | 18 / 5.0 / 3.4 |
| **Database** | SQLite (better-sqlite3) | 3.x |
| **AI Cloud** | Groq GPT-OSS 120B | — |
| **AI Local** | Llama 3.2 3B (Ollama/LM Studio) | — |
| **Web Search** | browser_search / Tavily API | — |

---

## 📁 Struktur Project

```
AI-Veltrix-App/
├── src/
│   ├── prompts/
│   │   ├── groqSystemPrompt.ts      # System prompt utama (1.577 baris)
│   │   └── localSystemPrompt.ts     # Versi ringan (300 baris)
│   ├── services/
│   │   ├── groqService.ts           # Groq API + browser_search
│   │   ├── localLLMService.ts       # LM Studio/Ollama + Tavily
│   │   ├── llmService.ts            # Smart fallback routing
│   │   └── memoryService.ts         # SQLite operations
│   ├── components/
│   │   ├── Sidebar.tsx              # History, settings, new chat
│   │   ├── ChatArea.tsx             # Render messages + auto-scroll
│   │   ├── Message.tsx              # Markdown + code highlight
│   │   ├── InputArea.tsx            # Auto-resize textarea
│   │   ├── ArtifactViewer.tsx       # Code preview + copy
│   │   └── TypingIndicator.tsx      # 3 dots animation
│   ├── hooks/
│   │   ├── useChat.ts
│   │   ├── useLocalStorage.ts
│   │   └── useWebSearch.ts
│   ├── types/index.ts               # TypeScript interfaces
│   ├── utils/                       # logger, tokenCounter, rateLimiter
│   ├── db.ts                        # SQLite init & query
│   ├── index.ts                     # Express server entry
│   ├── App.tsx                      # React root
│   └── main.tsx                     # Frontend entry
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## ⚙️ Instalasi

### Prerequisites

- Node.js 20+ → [nodejs.org](https://nodejs.org)
- Groq API Key → [console.groq.com](https://console.groq.com) *(gratis)*
- *(Opsional)* Ollama → [ollama.com](https://ollama.com) untuk Local LLM

### Langkah Instalasi

```bash
# 1. Clone repo
git clone https://github.com/tegardevINF/AI-Veltrix-App.git
cd AI-Veltrix-App

# 2. Install dependencies (backend + frontend)
npm install
cd frontend-claude-app && npm install && cd ..

# 3. Setup environment
cp .env.example .env
# Edit .env → isi GROQ_API_KEY=gsk_xxxxxxxx

# 4. (Opsional) Setup Local LLM
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b

# 5. Jalankan
npm run dev         # Backend → http://localhost:3005
cd frontend-claude-app && npm run dev   # Frontend
```

---

## 🔧 Konfigurasi `.env`

```env
# Server
PORT=3005
NODE_ENV=development

# Groq API — https://console.groq.com
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=openai/gpt-oss-120b

# Local LLM (Ollama/LM Studio)
LLM_BASE_URL=http://127.0.0.1:1234/v1
LLM_MODEL=llama-3.2-3b-instruct
LLM_FALLBACK_ENABLED=true

# Web Search (opsional)
TAVILY_API_KEY=tvly_your_key_here

# Model parameters
LLM_TEMPERATURE=0.6
LLM_MAX_TOKENS=6000

# Rate limiting
MAX_RETRIES=3
RATE_LIMIT_MAX_REQUESTS=25
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
    "usage": { "prompt_tokens": 150, "completion_tokens": 200 }
  }
}
```

### `GET /api/health`

```bash
curl http://localhost:3005/api/health
```

```json
{
  "status": "ok",
  "config": {
    "groq_model": "openai/gpt-oss-120b",
    "local_model": "llama-3.2-3b-instruct"
  }
}
```

---

## 📊 Performance

| Operation | Groq (p50) | Groq (p99) | Local (p50) | Local (p99) |
|---|---|---|---|---|
| Simple Query | 800ms | 1.2s | 1.5s | 3s |
| Complex Reasoning | 1.5s | 2.5s | 4s | 8s |
| Code Generation | 1.2s | 2s | 3s | 6s |
| Web Search | 1.8s | 3s | 2.5s | 5s |

| Model | RPM | TPM |
|---|---|---|
| Groq GPT-OSS 120B | 30 | 8,000 |
| Local LLM | ∞ | ∞ |

---

## ❌ Error & Troubleshooting

| Error | Penyebab | Solusi |
|---|---|---|
| `GROQ_API_KEY not found` | File `.env` belum diisi | `cp .env.example .env` lalu isi key |
| `Rate limit exceeded` | Terlalu banyak request | Tunggu 1–2 menit atau aktifkan fallback |
| `ECONNREFUSED` | Local LLM tidak jalan | Jalankan `ollama serve` |
| Port 3005 sudah dipakai | Konflik port | Ganti `PORT` di `.env` |
| TypeScript build error | Type error | `npm run type-check` lalu fix |

---

## 🚀 Deploy

**Docker:**
```bash
docker build -t ai-veltrix .
docker run -p 3005:3005 --env-file .env ai-veltrix
```

**PM2 (production):**
```bash
npm run build
pm2 start dist/index.js --name ai-veltrix
```

**Frontend (Vercel):**
```bash
vercel
```

---

## 🤝 Kontribusi

```bash
git checkout -b feature/nama-fitur
# buat perubahan
git commit -m "feat: deskripsi fitur"
git push origin feature/nama-fitur
# buka Pull Request
```

**Commit convention:** `feat` · `fix` · `docs` · `refactor` · `test` · `chore`

---

## 📄 License

MIT © 2025 [Tegar](https://github.com/tegardevINF)

---

<div align="center">

<img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="280" alt="coding" />

<br/><br/>

*Built with TypeScript, Node.js, React & Groq API*

<br/>

**⭐ Star this repo if it helped you!**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8B5CF6,50:1a0533,100:0a0a0f&height=120&section=footer" width="100%"/>

</div>
