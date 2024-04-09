import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {MockAuthDataService} from "./_mock/mock-auth-data.service";
import {User} from "../entities/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly mockAuthDataService: MockAuthDataService
  ) { }

  signIn(login: string, password: string) {

    return this.mockAuthDataService.signIn(login, password)
      .pipe(
        tap(user => {
          this.currentUser$.next(user);
        })
      );
  }

  autoLogin() {
    return this.mockAuthDataService.autoLogin()
      .pipe(
        tap(user => {
          this.currentUser$.next(user);
        })
      );
  }

  logout() {
    this.currentUser$.next(undefined);

    return this.mockAuthDataService.logout();
  }
}
