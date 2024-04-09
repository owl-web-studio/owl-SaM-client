import { Injectable } from '@angular/core';
import {of, throwError} from "rxjs";
import {MockDataService} from "./mock-data.service";
import {MockUserData} from "../../entities/_mock/mock-user-data.model";
import {User} from "../../entities/user.model";

@Injectable({
  providedIn: 'root'
})
export class MockAuthDataService {

  constructor(
    private readonly mockDataService: MockDataService
  ) {
  }

  get users(): MockUserData[] {
    return this.mockDataService.users;
  }

  signIn(login: string, password: string) {
    const userData = this.users.find(user => {
      return user.login === login && user.password === password;
    });

    const user: User | undefined = userData ? userData as User : undefined;

    if (user) {
      delete (user as any).password;
      localStorage.setItem('user', JSON.stringify(user));
      return of(user);
    } else {
      return throwError(() => {
        return new Error('Пароль неверный или пользователь не существует!')
      })
    }
  }

  autoLogin() {
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      const user = JSON.parse(userJSON);
      delete (user as any)['password'];
      return of(user);
    } else {
      return throwError(() => {
        return new Error('Пользователь не авторизирован');
      })
    }
  }

  logout() {
    localStorage.removeItem('user');

    return of({})
  }
}
