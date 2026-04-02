import { Chat } from "./chat";
import { OpenAI } from "openai";

export class AIBot extends Chat
{

  private openai: OpenAI;

  constructor()
  {
    super();
    this.openai = new OpenAI({
      apiKey: "XEPPT9-ntBV6A9f_eYzvD7wiKly_LzD5l1jaJQ6hS8",
      baseURL: "https://api.venice.ai/api/v1",
    });
  }


  generateMessage(): string
  {
    const messages = [
      "Hello everyone!",
      "How's it going?",
      "What's up?",
      "Anyone here?",
      "Good day!"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  async fetchResponseFromAPI(): Promise<string>
  {
    const response = await this.openai.completions.create({
      model: "dolphin-2.9.2-qwen2-72b",
      prompt: this.generateMessage(),
    });
    return response.choices[0].text;
  }

  async sendMessage(): Promise<void>
  {
    const timestamp: string = Date.now().toString();
    const message: string = await this.fetchResponseFromAPI();
    const senderId: string = "AI_Bot";
    this.addMessage(timestamp, message, senderId);
  }
}
