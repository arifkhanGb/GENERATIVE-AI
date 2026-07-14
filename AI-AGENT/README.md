# 🤖 AI Agent From Scratch (Without Any Framework)

An AI Agent built from scratch using **Node.js** and the **OpenAI API** to understand the core concepts behind Agentic AI without relying on frameworks such as LangChain, CrewAI, AutoGen, or LangGraph.

## 🚀 Project Overview

Most AI applications directly send user prompts to an LLM and return responses.

This project takes a different approach.

The AI Agent follows a structured reasoning loop:

```text
START → PLAN → ACTION → OBSERVATION → OUTPUT
```

Instead of immediately answering a question, the agent:

1. Understands the user's request
2. Creates a plan
3. Selects the appropriate tool
4. Executes the tool
5. Observes the result
6. Generates the final response

This demonstrates the fundamental building blocks of Agentic AI systems.

---

## 🏗️ Architecture

```text
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│     LLM     │
│  (Planner)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Action    │
│   Decision  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Tool     │
│ Execution   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Observation │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Final Reply │
└─────────────┘
```

---

## 🔄 Agent Workflow

### Step 1: User Query

```json
{
  "type": "user",
  "user": "What is the weather in London?"
}
```

### Step 2: Planning

```json
{
  "type": "plan",
  "plan": "I will call getWeatherDetails for London."
}
```

### Step 3: Action

```json
{
  "type": "action",
  "function": "getWeatherDetails",
  "input": "London"
}
```

### Step 4: Observation

```json
{
  "type": "observation",
  "observation": "10°C"
}
```

### Step 5: Final Response

```json
{
  "type": "response",
  "response": "The current weather in London is 10°C."
}
```

---

## 🛠️ Tech Stack

* Node.js
* OpenAI API
* JavaScript (ES Modules)
* readline-sync

---

## 🔧 Available Tool

### getWeatherDetails(city)

Returns weather information for a given city.

Example:

```javascript
getWeatherDetails("London");
```

Output:

```text
10°C
```

---

## 📂 Project Structure

```text
AI-AGENT/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/arifkhanGb/GENERATIVE-AI.git
```

Move into the project:

```bash
cd GENERATIVE-AI
```

Install dependencies:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=your_api_key_here
```

---

## ▶️ Run the Agent

```bash
node index.js
```

Example:

```text
>> What is the weather in London?

AI Response:
{
  "type": "response",
  "response": "The current weather in London is 10°C."
}
```

---

## 🎯 Key Learnings

* How AI Agents work internally
* Planning and reasoning loops
* Tool calling concepts
* Observation-driven execution
* Structured JSON communication
* Agent architecture fundamentals

---

## 🚀 Future Improvements

* Real Weather API Integration
* Memory Management
* Multiple Tool Support
* Function Calling
* Autonomous Task Execution
* Web Search Tool
* Multi-Agent Collaboration
* Agentic AI with Spring Boot

---

## 📌 Repository

GitHub:
https://github.com/arifkhanGb/GENERATIVE-AI

---

## ⭐ Why This Project?

Most developers start with frameworks.

This project focuses on understanding the fundamentals first.

Once you understand the Agent Loop:

```text
PLAN → ACTION → OBSERVATION → OUTPUT
```

Frameworks become implementation details rather than magic.

Understanding the fundamentals is the first step toward building production-grade AI Agents.
