import { Injectable } from '@angular/core';
import {MockUserData} from "../../entities/_mock/mock-user-data.model";
import {Space} from "../../entities/space.model";
import {Role} from "../../entities/role.model";
import {of} from "rxjs";
import {Organization} from "../../entities/organization.model";

type DataType =
  'organizations' |
  'spaces' |
  'users';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  roles: Role[] = [
    {
      id: 1,
      name: 'Пользователь',
      description: 'Роль с базовыми правами'
    },
    {
      id: 999,
      name: 'Суперпользователь',
      description: 'Роль с неограниченными правами'
    }
  ]
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
      jobTitle: 'Тестовая должность',
      roles: [this.roles[0]],
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
      jobTitle: 'Генеральный директор',
      roles: [this.roles[1]],
    },
  ];
  spaces: Space[] = [
    {
      id: 1,
      name: 'Департамент R&D',
      description: 'Знания департамента развития и проектирования',

    },
    {
      id: 2,
      name: 'Департамент разработки',
      description: 'Знания департамента разработки',
    }
  ];
  organizations: Organization[] = [
    {
      id: 0,
      name: 'Блины и галошницы',
      description: 'лалаа',
      leader: this.users[1]
    }
  ]

  constructor() { }

  get(dataType: DataType) {
    let result: any = [];

    switch (dataType) {
      case "organizations":
        result = this.organizations;
        break;
      case "spaces":
        result = this.spaces;
        break;
      case "users":
        result = this.users.map(user => {
          delete (user as any).password;
          return user
        });
        break;
    }

    return of(result);
  }

  getById(dataType: DataType, id: number) {
    let result: any = {};

    switch (dataType) {
      case "organizations":
        result = this.organizations.find((organization) => {
          return organization.id === id;
        });
        break;
      case "spaces":
        result = this.spaces.find((space) => {
          return space.id === id;
        });
        break;
      case "users":
        result = this.users.find((user) => {
          return user.id === id;
        });
        delete (result as any).password
        break;
    }

    return of(result);
  }

  post(dataType: DataType, data: any) {
    let result: any = [];

    switch (dataType) {
      case "organizations":
        this.organizations.push({
          id: this.organizations[this.organizations.length - 1].id + 1,
          ...data
        });
        result = this.organizations.find(element => element.id === this.organizations[this.organizations.length - 1].id + 1)
        break;
      case "spaces":
        this.spaces.push({
          id: this.spaces[this.spaces.length - 1].id + 1,
          ...data
        });
        result = this.spaces.find(element => element.id === this.spaces[this.spaces.length - 1].id + 1)
        break;
      case "users":
        this.users.push({
          id: this.users[this.users.length - 1].id + 1,
          ...data
        });
        result = this.users.find(element => element.id === this.users[this.users.length - 1].id + 1)
        break;
    }

    return of(result);
  }
}
