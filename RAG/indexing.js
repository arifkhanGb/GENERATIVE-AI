import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

const main = async () => {
  try {
    //-------------------INDEX PHASE-------------------------------------
    // step 1 load the pdf data after the raw data
    const pdfPath = "./nodejs_dummy_rag.pdf";
    const loader = new PDFLoader(pdfPath);
    const docs = await loader.load();
    console.log("page loaded  ", docs.length);

    // step 2 split pdf data into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 10000,
      chunkOverlap: 1000,
    });
    const chunks = await splitter.splitDocuments(docs);
    console.log("total chunks ", chunks.length);
    console.log("first chunks ", chunks[0]);

    // step 3 create vector embedding for each chunks

    const embedding = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-large",
    });
    const vectorData = await embedding.embedDocuments(
      chunks.map((chunk) => chunk.pageContent),
    );
    console.log("Total embeddings generated:", vectorData.length);
    console.log("Embedding for first chunk:", vectorData[0]);

    // step 4 store documents(chunks) & embeddings inside vector DB Qdrant

    const vertorStore = await QdrantVectorStore.fromDocuments(
      chunks,
      embedding,
      {
        url: "http://localhost:6333",
        collectionName: "notebookllm",
      },
    );
    console.log("Data successfully indexed into Qdrant...");
  } catch (err) {
    console.log(`Indexing error: ${err}`);
  }
};

main();
