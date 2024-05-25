import {User} from "./user.model";

export interface UserGroup {
  id: number;
  name: string;
  description: string;
  users: User[];
}
