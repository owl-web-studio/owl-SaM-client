import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";
import {Observable} from "rxjs";
import {Space} from "../entities/space.model";
import {Format} from "../entities/format.model";

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor(
    private readonly mockDataService: MockDataService
  ) { }

  getFormatInfo(formatId: number) {
    return this.mockDataService.getById('formats', formatId);
  }

  getFormats() {
    return this.mockDataService.get('formats') as Observable<Format[]>;
  }
}
