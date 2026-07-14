# 📚 RAG PDF Question Answering System

A production-style **Retrieval-Augmented Generation (RAG)** application built with **Node.js**, **LangChain**, **OpenAI Embeddings**, and **Qdrant Vector Database**.

The application indexes PDF documents into a vector database and answers user questions by retrieving semantically relevant document chunks before generating responses using an OpenAI LLM.

---

# 🚀 Features

- 📄 Load PDF documents
- ✂️ Intelligent document chunking
- 🧠 Generate vector embeddings using OpenAI
- 🗄️ Store embeddings in Qdrant Vector Database
- 🔍 Semantic similarity search
- 🤖 Context-aware answer generation using GPT-4.1 Nano
- ⚡ Fast Retrieval-Augmented Generation (RAG) pipeline
- 📌 Modular architecture

---

# 🏗️ Architecture

```text
                    INDEXING PHASE

          PDF Document
                │
                ▼
         PDF Loader
                │
                ▼
      Recursive Text Splitter
                │
                ▼
         Document Chunks
                │
                ▼
     OpenAI Embedding Model
                │
                ▼
      Vector Embeddings
                │
                ▼
      Qdrant Vector Database


                    QUERY PHASE

          User Question
                │
                ▼
      Query Embedding
                │
                ▼
     Semantic Search (Qdrant)
                │
                ▼
      Top-K Relevant Chunks
                │
                ▼
       GPT-4.1 Nano LLM
                │
                ▼
        Final AI Response
```

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| LangChain | RAG Framework |
| OpenAI | Embeddings & LLM |
| Qdrant | Vector Database |
| Docker | Qdrant Deployment |
| PDF Loader | Document Parsing |

---

# 📂 Project Structure

```
RAG/
│
├── indexing.js              # Document indexing pipeline
├── chat.js                  # Retrieval & chat pipeline
├── nodejs_dummy_rag.pdf     # Sample document
├── .env                     # API keys
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <repository-url>
cd RAG
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment File

Create a `.env` file.

```env
OPENAI_API_KEY=your_openai_api_key
```

---

## 4. Start Qdrant

Using Docker

```bash
docker run -d \
-p 6333:6333 \
--name qdrant \
qdrant/qdrant
```

Verify

```
http://localhost:6333/dashboard
```

---

# 📦 Dependencies

```json
{
  "@langchain/community": "...",
  "@langchain/core": "...",
  "@langchain/openai": "...",
  "@langchain/qdrant": "...",
  "@langchain/textsplitters": "...",
  "@qdrant/js-client-rest": "...",
  "dotenv": "...",
  "openai": "...",
  "pdf-parse": "..."
}
```

---

# 🧠 Index Documents

Run

```bash
npm run index
```

Pipeline executed

```
Load PDF
      ↓
Split into Chunks
      ↓
Generate Embeddings
      ↓
Store Embeddings
      ↓
Qdrant
```

Expected Output

```
PDF Loaded
Chunks Created
Embeddings Generated
Data successfully indexed into Qdrant...
```

---

# 💬 Ask Questions

Run

```bash
npm run chat
```

Example

```
Question

What is MongoDB Hosting?

↓

Retriever searches Qdrant

↓

Relevant chunks returned

↓

GPT generates final answer
```

---

# 🧠 RAG Workflow

## Step 1

Load PDF

```
PDF
 ↓
Document Loader
```

---

## Step 2

Chunk Document

```
Large Document

↓

Smaller Chunks
```

---

## Step 3

Generate Embeddings

```
Chunk

↓

Embedding Model

↓

Vector
```

---

## Step 4

Store in Qdrant

```
Vector

↓

Qdrant Collection
```

---

## Step 5

User Query

```
Question

↓

Embedding

↓

Vector Search
```

---

## Step 6

Retrieve Context

```
Top 3 Similar Chunks
```

---

## Step 7

Generate Answer

```
Context

+

User Question

↓

GPT-4.1 Nano

↓

Answer
```

---

# 📈 Example Query

**Question**

```
What is MongoDB Hosting?
```

**Response**

```
MongoDB hosting means running a MongoDB database on a server so applications can connect to it.

Hosting options include:

• Local Installation
• Self Hosted VPS
• Cloud VM
• MongoDB Atlas

MongoDB Atlas provides automatic backups, monitoring, security, scaling, replica sets, automatic updates and global deployment.
```

---

# 📊 Current Capabilities

- ✅ PDF Document Loading
- ✅ Recursive Text Chunking
- ✅ OpenAI Embeddings
- ✅ Semantic Search
- ✅ Vector Storage
- ✅ GPT Response Generation
- ✅ Context-aware Question Answering

---

# 🔮 Future Enhancements

- Interactive Chat Interface
- Multi-PDF Support
- Streaming Responses
- Chat Memory
- Metadata Filtering
- Hybrid Search (BM25 + Vector Search)
- Reranking
- Citation Support
- Source Highlighting
- React Frontend
- Authentication
- Document Upload API
- Spring Boot Backend Integration
- Spring AI / LangChain4j Migration

---

# 📌 Learning Objectives

This project demonstrates:

- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings
- Vector Databases
- Prompt Engineering
- Context Injection
- OpenAI Integration
- LangChain Fundamentals
- End-to-End RAG Pipeline

---

# 📄 License

This project is intended for educational purposes and experimentation with modern AI application development.

---

# 👨‍💻 Author

**Arif Khan**

Java Backend Developer | Spring Boot | Microservices | GenAI | RAG | LangChain | OpenAI | Docker | Qdrant

---

## ⭐ If you found this project useful, consider giving it a star.