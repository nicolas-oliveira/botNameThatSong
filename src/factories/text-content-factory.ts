import { TextContent } from "@zenvia/sdk";

function createText(...message: string[]): TextContent[] {
  if (message.length === 1)
    return [new TextContent(message[0])];
  return message.map((messageString) => new TextContent(messageString));
}

export default createText;
