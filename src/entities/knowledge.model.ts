import {Format} from "./format.model";
import {Category} from "./category.model";


export interface Knowledge {
  id: number;
  name: string;
  description: string;
  content: string | File;
  format: Format;
  createTime: Date;
  updateTime?: Date;
  categories?: Category[],
}
