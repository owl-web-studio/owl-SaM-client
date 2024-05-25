import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";
import {Observable} from "rxjs";
import {User} from "../entities/user.model";
import {UserGroup} from "../entities/user-group.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly mockDataService: MockDataService
  ) { }

  getUserInfo(userId: number) {
    return this.mockDataService.getById('users', userId);
  }

  getUsers() {
    return this.mockDataService.get('users') as Observable<User[]>;
  }

  getUserGroups() {
    return this.mockDataService.get('userGroups') as Observable<UserGroup[]>;
  }
}
