import {Format} from "./format.model";
import {Category} from "./category.model";

export type KnowledgeStatus = 'Актуально' | 'Неактуально';

export interface Knowledge {
  id: number;
  name: string;
  description: string;
  content: string | File;
  format: Format;
  createTime: Date;
  updateTime?: Date;
  categories?: Category[],
  status: KnowledgeStatus
}
