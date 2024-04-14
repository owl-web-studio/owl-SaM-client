import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";
import {Observable} from "rxjs";
import {Organization} from "../entities/organization.model";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private readonly mockDataService: MockDataService
  ) { }

  getOrganizationInfo(organizationId: number) {
    return this.mockDataService.getById('organizations', organizationId);
  }

  getOrganizations() {
    return this.mockDataService.get('organizations') as Observable<Organization[]>;
  }
}
