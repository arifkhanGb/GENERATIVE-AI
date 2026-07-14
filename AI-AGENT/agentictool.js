import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import readlineSync from "readline-sync";
import axios from "axios";
import { exec } from "child_process";
import { type } from "os";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(process.env.OPENAI_API_KEY);
const client = new OpenAI({
     apiKey: OPENAI_API_KEY
})

// create tool which access real time wheather data (Tools)

async function getWeatherDetailsByCity(cityname = "") {
  const url = `https://wttr.in/${cityname.toLowerCase()}?format=%C+%t`;
  const { data } = await axios.get(url, { responseType: "text" });
  return `The current weather of ${cityname} is ${data}`;
}

// Executes safe linux/unix commands on localhost
async function executeCommand(cmd = "") {
  return new Promise((res, rej) => {
    exec(cmd, (error, data) => {
      if (error) {
        return res(`Error running command ${error}`);
      } else {
        res(data);
      }
    });
  });
}



// Fetches public GitHub profile information
async function getGithubUserInfoByUsername(username = "") {
  const url = `https://api.github.com/users/${username.toLowerCase()}`;
  const { data } = await axios.get(url);
  return JSON.stringify({
    login: data.login,
    id: data.id,
    name: data.name,
    location: data.location,
    twitter_username: data.twitter_username,
    public_repos: data.public_repos,
    public_gists: data.public_gists,
    user_view_type: data.user_view_type,
    followers: data.followers,
    following: data.following,
  });
}

const TOOL_MAP = {
  getWeatherDetailsByCity: getWeatherDetailsByCity,
  executeCommand: executeCommand,
  getGithubUserInfoByUsername: getGithubUserInfoByUsername,
};  

const SYSTEM_PROMPT = `
    You are an AI assistant who works on START, THINK, OBSERVE, TOOL and OUTPUT format.
    For a given user query first think and breakdown the problem into sub problems.
    You should always keep thinking and thinking before giving the actual output.

    Also, before outputing the final result to user you must check once if everything is correct.
    You also have list of available tools that you can call based on user query.

    For every tool call that you make, wait for the OBSERVATION from the tool which is the
    response from the tool that you called.

    Available Tools:
    - getWeatherDetailsByCity(cityname: string)
    - executeCommand(command: string)
    - getGithubUserInfoByUsername(username: string)

    Rules:
    - Strictly follow the output JSON format
    - Always follow sequence START → THINK → TOOL → OBSERVE → OUTPUT
    - Perform only one step at a time
    - Wait for observation when tool is used
    - Think multiple times before final output

    Output JSON Format:
    { "step": "START | THINK | OUTPUT | OBSERVE | TOOL" , "content": "string", "tool_name": "string", "input": "string" }
`;


const messages = [{ role: "system", content: SYSTEM_PROMPT,}];
  
while (true) {

    const query = readlineSync.question(">> ");

    if (query === "exit") {
        console.log("Bye!");
        break;
    }

    messages.push({
        role: "user",
        content: JSON.stringify({
            type: "user",
            user: query
        })
    });

    while (true) {

        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages
        });

        const parsedContent = JSON.parse(
            response.choices[0].message.content
        );

        messages.push({
            role: "assistant",
            content: JSON.stringify(parsedContent)
        });

        switch (parsedContent.step) {

            case "START":
                console.log("🔥", parsedContent.content);
                continue;

            case "THINK":
                console.log("🧠", parsedContent.content);
                continue;

            case "TOOL":

                const tool = TOOL_MAP[parsedContent.tool_name];

                if (!tool) {
                    messages.push({
                        role: "developer",
                        content: `Tool ${parsedContent.tool_name} not found`
                    });
                    continue;
                }

                const observation = await tool(parsedContent.input);

                console.log("🛠", observation);

                messages.push({
                    role: "developer",
                    content: JSON.stringify({
                        step: "OBSERVE",
                        content: observation
                    })
                });

                continue;

            case "OUTPUT":
                console.log("🤖", parsedContent.content);
                break;

            default:
                console.log("Unknown step");
                break;
        }

        break;
    }
}