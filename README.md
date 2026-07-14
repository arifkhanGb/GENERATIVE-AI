# Generative AI Projects

A Node.js learning repository containing two practical Generative AI projects:

- **AI-AGENT** — a command-line AI agent that demonstrates a plan → action → observation → output loop and tool calling.
- **RAG** — a Retrieval-Augmented Generation (RAG) application that indexes a PDF in Qdrant and answers questions from retrieved context.

## Repository layout

```text
GENERATIVE-AI/
├── AI-AGENT/                 # Tool-calling AI agent
│   ├── index.js              # Basic agent workflow
│   ├── agentictool.js        # Extended agent workflow
│   └── package.json
├── RAG/                      # PDF question-answering RAG pipeline
│   ├── indexing.js           # PDF ingestion and vector indexing
│   ├── chat.js               # Retrieval and answer generation
│   ├── docker-compose.yml    # Local Qdrant service
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18 or later
- An OpenAI API key
- Docker Desktop (required for the RAG project's local Qdrant database)

## Clone the repository

```bash
git clone https://github.com/arifkhanGb/GENERATIVE-AI.git
cd GENERATIVE-AI
```

## Environment variables

Create a separate `.env` file in **each** project folder that needs the OpenAI API.

```env
OPENAI_API_KEY=your_openai_api_key
```

Never commit `.env` files or API keys. They are excluded by the repository's `.gitignore` files.

## AI Agent

The basic agent accepts terminal input, asks the model to return structured JSON, and executes its available weather tool when requested.

```bash
cd AI-AGENT
npm install
node index.js
```

Type a question at the `>>` prompt. Stop the process with `Ctrl+C`.

`agentictool.js` is an extended experimental version that also includes weather lookup and GitHub-profile tools:

```bash
node agentictool.js
```

> **Security note:** `agentictool.js` contains an `executeCommand` tool that can run commands on your computer. Treat it as a local experiment only; do not expose it to untrusted users or deploy it without a strict command allowlist and isolation. Also remove any API-key logging before use.

## RAG PDF Question Answering

The RAG project performs the following workflow:

```text
PDF → text chunks → OpenAI embeddings → Qdrant → semantic retrieval → OpenAI answer
```

### 1. Install dependencies and configure the API key

```bash
cd RAG
npm install
```

Create `RAG/.env` using the environment-variable example above.

### 2. Start Qdrant

```bash
docker compose up -d
```

Qdrant will be available at `http://localhost:6333/dashboard`.

### 3. Index the sample PDF

```bash
npm run index
```

This reads `nodejs_dummy_rag.pdf`, splits it into chunks, creates embeddings with `text-embedding-3-large`, and stores them in the `notebookllm` Qdrant collection.

### 4. Ask a question

```bash
npm run chat
```

The question is currently defined in `RAG/chat.js`. Edit the `userQuery` value, then run the command again to try another question.

### Stop the database

```bash
docker compose down
```

## Technology

| Area | Tools |
| --- | --- |
| Runtime | Node.js, JavaScript (ES modules) |
| AI models | OpenAI chat completions and embeddings |
| Agent tools | `readline-sync`, Axios |
| RAG orchestration | LangChain |
| Vector database | Qdrant via Docker |

## Development workflow

From the repository root, stage, commit, and push your changes:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

## Notes

This repository is intended for learning and experimentation. Running the projects makes calls to OpenAI and may incur charges on the associated API account.
