import { FileContent } from "@zenvia/sdk";

function createFile(url: string, type: string): FileContent {
  return new FileContent(url, type);
}

export default createFile;
