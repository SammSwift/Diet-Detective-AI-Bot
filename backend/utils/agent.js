import { AgentExecutor } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createOpenAIFunctionsAgent } from "langchain/agents";
import { DynamicTool } from "@langchain/core/tools";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import modified_template from "./prompt.js";
import fs from "fs";
import util from "util";
import path from "path";
// import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();

// Promisify the fs.readFile function
const readFile = util.promisify(fs.readFile);
// Promisify fs.unlink to delete the file
const unlink = util.promisify(fs.unlink);

async function getImageDescription(imagePath) {
  try {
    const filePath = path.join(__dirname, imagePath);
    const data = await readFile(filePath);

    // Delete the file after reading
    await unlink(filePath);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();
    return result[0]["generated_text"];
  } catch (error) {
    throw error; // Rethrow the error to handle it outside this function
  }
}

//*******************************DEFINE TOOL********************************
const tavilySearch = new TavilySearchResults({ maxResults: 1 });

const imageToTextTool = new DynamicTool({
  name: "image_to_text",
  description:
    "Useful when a user gives you an image to analyze you must use this tool. it should only be used if an image path is passed in. Input should be the image_path",
  func: async (img_pth) => await getImageDescription(img_pth),
});
const tools = [tavilySearch, imageToTextTool];

//*****************************DEFINE LLM AND PROMPT************************/
const llm = new ChatOpenAI({
  temperature: 0.8,
  model: "gpt-3.5-turbo",
});

// Define ChatPrompt
const prompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  new MessagesPlaceholder("agent_scratchpad"),
  ["system", modified_template],
  ["user", "{input}"],
]);

//*********************************DEFINE AGENT*******************************/

const agent = await createOpenAIFunctionsAgent({
  llm,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});

//*********************************DEFINE AGENT MEMORY*******************************/
const messageHistory = new ChatMessageHistory();

const agentWithChatHistory = new RunnableWithMessageHistory({
  runnable: agentExecutor,
  // This is needed because in most real world scenarios, a session id is needed per user.
  // It isn't really used here because we are using a simple in memory ChatMessageHistory.
  getMessageHistory: (_sessionId) => messageHistory,
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

export default agentWithChatHistory;
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function runAgent() {
//   while (true) {
//     const message = await askQuestion(
//       "Enter your message (or type 'exit' to quit): "
//     );
//     if (message.toLowerCase() === "exit") {
//       console.log("Exiting...");
//       break;
//     }

//     const result = await agentWithChatHistory.invoke(
//       {
//         input: message,
//         image_path: `image-1707404739080.jpeg`,
//         dietary_restrictions: ["lactose intolerant"],
//       },
//       {
//         // This is needed because in most real world scenarios, a session id is needed per user.
//         // It isn't really used here because we are using a simple in memory ChatMessageHistory.
//         configurable: {
//           sessionId: "foo",
//         },
//       }
//     );

//     console.log(result);
//   }

//   rl.close();
// }

// function askQuestion(question) {
//   return new Promise((resolve) => {
//     rl.question(question, resolve);
//   });
// }

// runAgent();
