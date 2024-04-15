import {Format} from "./format.model";
import {Knowledge} from "./knowledge.model";
import {Category} from "./category.model";

export interface Directory {
  id: number;
  name: string;
  description: string;
  availableFormats?: Format[];
  createTime: Date;
  updateTime?: Date;
  children?: (Directory | Knowledge)[];
  categories?: Category[];
}
