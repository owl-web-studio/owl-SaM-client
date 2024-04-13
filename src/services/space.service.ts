import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  constructor(
    private readonly mockDataService: MockDataService
  ) { }

  getSpaceInfo(spaceId: number) {
    return this.mockDataService.getById('spaces', spaceId);
  }

  getSpaces() {
    return this.mockDataService.get('spaces');
  }
}
