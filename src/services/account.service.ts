import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private readonly authService: AuthService
  ) { }

  getProfileInfo() {
    return this.authService.currentUser$
  }
}
