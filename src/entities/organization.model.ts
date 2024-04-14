import {User} from "./user.model";
import {Space} from "./space.model";

export interface Organization {
  id: number;
  name: string;
  description: string;
  leader: User;
}
