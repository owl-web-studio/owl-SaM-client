import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";
import {Observable} from "rxjs";
import {Role} from "../entities/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private readonly mockDataService: MockDataService
  ) { }

  getRoleInfo(roleId: number) {
    return this.mockDataService.getById('roles', roleId);
  }

  getRoles() {
    return this.mockDataService.get('roles') as Observable<Role[]>;
  }

  createRole(data: any): Observable<Role> {
    return this.mockDataService.post('roles', data);
  }
}
