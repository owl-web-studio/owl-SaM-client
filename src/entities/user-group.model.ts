import {User} from "./user.model";

export interface UserGroup {
  id: number;
  description: string;
  users: User[];
}
