import {KnowledgeFormatType} from "./knowledge-format-type";

export interface Format {
  id: number;
  name: string;
  extensions: string[];
  type: KnowledgeFormatType;
}
