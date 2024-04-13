import {Role} from "../role.model";

export interface MockUserData {
  id: number;
  login: string;
  password: string;

  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  phoneNumber: string;

  roles: Role[];
}
