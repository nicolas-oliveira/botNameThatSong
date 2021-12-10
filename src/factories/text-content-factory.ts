import { TextContent } from "@zenvia/sdk";

function createText(message: string): TextContent {
  return new TextContent(message);
}

export default createText;
