import {User} from "./user.model";

export interface KnowledgeComment {
  id: number,
  content: string,
  author: User,
  createDate: Date,
  updateDate: Date,
}
