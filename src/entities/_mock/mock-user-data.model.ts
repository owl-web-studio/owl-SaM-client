import {User} from "../user.model";

export interface MockUserData extends User {
  login: string;
  password: string;
}
