import {Role} from "./role.model";

export interface User {
  id: number;
  login: string;

  firstName: string;
  lastName: string;
  patronymic?: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  roles: Role[];

  avatarUrl?: string;
}
