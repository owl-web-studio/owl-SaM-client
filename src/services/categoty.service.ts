import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";
import {Observable} from "rxjs";
import {Category} from "../entities/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategotyService {

  constructor(
    private readonly mockDataService: MockDataService
  ) { }

  getCategoryInfo(categoryId: number) {
    return this.mockDataService.getById('categories', categoryId);
  }

  getCategories() {
    return this.mockDataService.get('categories') as Observable<Category[]>;
  }
}
