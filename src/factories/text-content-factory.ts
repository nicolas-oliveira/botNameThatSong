import { TextContent } from "@zenvia/sdk";

function newMessage(message: string): TextContent {
  return new TextContent(message);
}

export default newMessage;
