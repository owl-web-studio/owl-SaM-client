import { Injectable } from '@angular/core';
import {MockUserData} from "../../entities/_mock/mock-user-data.model";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  users: MockUserData[] = [
    {
      id: 1,
      login: 'test',
      password: 'test',
      firstName: 'Иван',
      lastName: 'Иванов',
      patronymic: 'Иванович',
      email: 'test@mail.ru',
      phoneNumber: '+79876543210',
      role: 'Мастер',
    },
    {
      id: 2,
      login: 'admin',
      password: 'admin',
      firstName: 'Степан',
      lastName: 'Беркунов',
      patronymic: 'Игоревич',
      email: 'studiorain27@gmail.com',
      phoneNumber: '+799900000000',
      role: 'Администратор',
    },
  ];
  constructor() { }
}
