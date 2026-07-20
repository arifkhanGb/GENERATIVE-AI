import OpenAI from "openai";
  import readlineSync from "readline-sync";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

//create a client for the OpenAI API (will interact with OpenAI models)
const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// create tool which access real time wheather data (Tools)
function getWeatherDetails(city = "") {
  if (city.toLocaleLowerCase() === "london") return "10°C";
  if (city.toLocaleLowerCase() === "paris") return "30°C";
  if (city.toLocaleLowerCase() === "scotland") return "20°C";
  if (city.toLocaleLowerCase() === "china") return "32°C";
}

const tools = {
  getWeatherDetails: getWeatherDetails,
};

const systemPrompt = `
you are a AI assestant with START, PLAN, ACTION, OBSERVATION and OUTPUT state.
wait for the user prompt and first PLAN using available tools.
after planning, take the action with appropriate tools and wait for the Observation based on Action.
once you get the observations, return the AI response based on start prompt and observations.

strintly follow the JSON output format as in examples

Available tools:
-function getWeatherDetails(city: string): string. 
getWeatherDetails is a function that accepts city name as string and returns the weather details. 

EXAMPLE:
{"type": "user", "user": "what is the sum of weather of London and Paris?"} 
{"type": "plan", "plan": "I will call getWeatherDetails for London"}
{"type": "action", "function": "getWeatherDetails", "input": "London"}
{"type": "observation", "observation": "10°C"}
{"type": "plan", "plan": "I will call getWeatherDetails for Paris"}
{"type": "action", "function": "getWeatherDetails", "input": "Paris"}
{"type": "observation", "observation": "10°C"}
`;

const userPrompt = "What is the weather in London?";

//state of messages for the chat conversation with the model
const messages = [{ role: "system", content: systemPrompt }];

while (true) {
const query = readlineSync.question(">>  ");
const q = {
  type: "user",
  user: query,
};
messages.push({ role: "user", content: JSON.stringify(q) });

// start auto prompting loop 
while (true) {
  const chat = await client.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    response_format: {
      type: "json_object",
    },
  });

  const result = chat.choices[0].message.content;
  messages.push({ role: "assistant", content: result });

  console.log("\n\n-----------start----------");
  console.log("AI Response: ", result);
  console.log("-----------end----------\n\n");
  const call = JSON.parse(result);

  if (call.type == "output" || call.type === "response") {
    console.log("Final Answer:", call.output || call.response);
    break;
    // Handle user input
  } else if (call.type === "action") {
    const fn = tools[call.function];
    const observation = fn(call.input);
    const obs = { type: "observation", observation: observation };
    messages.push({ role: "user", content: JSON.stringify(obs) });
  }
}
}

// async function chat(){
//     const result = await client.chat.completions.create({
//         model: "gpt-4o",
//         messages: [
//              {role: 'system', content: systemPrompt},

//              //what if we put this in auto prompting 
//             // {
//             //   role: 'developer',
//             //    content: '{"type": "plan", "plan": "I will call getWeatherDetails to find the current weather in London."}',
//             // },
//             //  {
//             //   role: 'developer',
//             //    content: '{"type": "action", "function": "getWeatherDetails", "input": "London"}',
//             // },
//             // {
//             //   role: 'developer',
//             //    content: '{"type": "observation", "observation": "10°C"}',
//             // }
//         ],
// });
// console.log(result.choices[0].message.content);
// }
// chat();

// client.chat.completions.create({
//     model: "gpt-4o",
//     messages: [{role: "user", content: userPrompt}]
// }).then((response) => {
//     const aiResponse = response.choices[0].message.content;
//     console.log("AI Response:", aiResponse);
// });
