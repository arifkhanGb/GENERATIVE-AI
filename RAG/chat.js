import "dotenv/config";
import { OpenAI } from "openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import readlineSync from "readline-sync";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async () => {
  try {
    // Step 6: user input query
    // const userQuery =
    //   "please, can you tell me about the MongoDB hosting is what and why use?";
    const messages = [{ role: "system", content: systemPrompt }];
    const userQuery = readlineSync.question(">>  ");
    const q = {
      type: "user",
      user: query,
    };

    messages.push({ role: "user", content: JSON.stringify(q) });

    // Step 7: create vector embedding for for user query
    const embedding = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-large",
    });

    // Step 8: search relevant vector embedding from vector Database Qdrant DB
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embedding,
      {
        url: "http://localhost:6333",
        collectionName: "notebookllm",
      },
    );

    // Step 9: retrieve relevant chunks from top 3 most relevant chunks for any query
    const vectorRetriver = vectorStore.asRetriever({
      k: 3,
    });
    const relevantChunks = await vectorRetriver.invoke(userQuery);
    console.log("\n========== RETRIEVED CHUNKS ==========\n");
    console.log(relevantChunks);

    // Step 6: user input query + retrieved semantic chunks
    const SYSTEM_PROMPT = `You are an AI assistant that answers questions based on the provided context available to you from a PDF file with the content and page number. Only answer based on the available context from file.
      Context: ${JSON.stringify(relevantChunks)}`;

    // Step 10: pass relevant data & user input query to chat LLM(s) to get the relevant Answer
    const messagesHistory = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userQuery },
    ];

    console.log("\nRetrieved Chunks:\n");
    console.log(relevantChunks);
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: messagesHistory,
    });
    // Step 11: user get the final output through chat LLM
    console.log("Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("Indexing error:");
    console.error(error);
  }
};

main();
