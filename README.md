# Generative AI Learning Repository

This repository is a hands-on space for learning how modern Generative AI applications are designed, built, and improved. It focuses on practical experimentation with large language models, prompting, embeddings, retrieval, tool use, and AI application workflows.

## Purpose

Generative AI is more than sending a prompt to a model. Useful applications need clear instructions, reliable data, well-defined tools, careful evaluation, and responsible handling of credentials and user input.

This repository supports learning those ideas through small, practical implementations and experiments.

## Topics covered

- Large Language Models (LLMs) and chat completions
- Prompt engineering and structured outputs
- Tool calling and agent-style workflows
- Embeddings and semantic search
- Retrieval-Augmented Generation (RAG)
- Vector databases and document indexing
- Context-aware responses
- API integration with OpenAI
- Docker-based local development
- Secure environment-variable management

## Learning approach

The best way to understand Generative AI is to build, observe, and iterate:

```text
Learn a concept → build a small experiment → test the output → evaluate limitations → improve the design
```

Each implementation is intended to make the underlying AI workflow visible rather than treating it as a black box.

## Prerequisites

- Node.js 18 or later
- An OpenAI API key
- Docker Desktop for services that run locally in containers
- Basic familiarity with JavaScript and the command line

## Setup

Clone the repository:

```bash
git clone https://github.com/arifkhanGb/GENERATIVE-AI.git
cd GENERATIVE-AI
```

Install dependencies in the learning module you want to run:

```bash
npm install
```

Create a local `.env` file where required:

```env
OPENAI_API_KEY=your_openai_api_key
```

Never commit API keys or `.env` files. Keep secrets local and rotate a key immediately if it is exposed.

## Core Generative AI concepts

### Prompting

A prompt defines the task, constraints, expected output, and available context. Clear prompts lead to more useful and predictable model responses.

### Embeddings

Embeddings convert text into vectors that capture semantic meaning. They make it possible to find content that is similar in meaning, not just exact wording.

### Retrieval-Augmented Generation

RAG retrieves relevant information from a knowledge source before asking an LLM to answer. This helps ground responses in provided documents and reduces reliance on model memory alone.

### Agents and tools

An agent-style workflow lets a model choose from defined tools, observe the result, and use that result to produce an answer. Tools should be narrowly scoped, validated, and protected from untrusted input.

## Responsible development

- Do not expose API keys in source code, commits, screenshots, or logs.
- Validate user input before sending it to tools or external services.
- Use allowlists and sandboxing for any command-execution capability.
- Treat model outputs as untrusted until they are validated for the intended use.
- Be mindful of OpenAI API usage and associated costs.
- Test with representative inputs and review incorrect or unsupported answers.

## Contributing

Keep changes focused and easy to review. Before pushing:

```bash
git status
git add .
git commit -m "Describe your change"
git push origin main
```

## License

This repository is intended for educational and experimental use.
