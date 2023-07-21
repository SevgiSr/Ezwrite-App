import pkg from "better-sse";
const { createSession } = pkg;
import User from "../db/models/User.js";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import querystring from "querystring";
import dotenv from "dotenv";
dotenv.config();

let prompt = {};
let GPTKey = process.env.OPENAI_KEY;

const sendGptPrompt = async (req, res) => {
  prompt = req.body.prompt;
  res.sendStatus(200);
};

const streamTokens = async (req, res) => {
  try {
    console.log("streaming");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const { length, style, content } = prompt;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You'll take user's input and write a paragraph consisting of exactly ${length} sentences and in a ${style} manner based on what user described in the input. Paragraph should be more valuable in terms of literature.`,
          },
          { role: "user", content: content },
        ],
        stream: true,
        // Other necessary parameters
      },
      {
        headers: {
          Authorization: `Bearer ${GPTKey}`,
          "Content-Type": "application/json",
        },
        responseType: "stream",
      }
    );

    response.data.on("data", (chunk) => {
      res.write(`${chunk}\n\n`);
      //send right away don't buffer
      res.flush();
    });
    response.data.on("end", () => {
      res.write("event: DONE\n");
      res.write("data: [DONE]\n\n");
      res.end();
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export { sendGptPrompt, streamTokens };
