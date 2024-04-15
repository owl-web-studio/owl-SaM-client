import { Injectable } from '@angular/core';
import {of} from "rxjs";

export interface searchElement {
  name: string,
  type: string,
  routerLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(query: string) {
    return of([
      {
        name: 'Лалла',
        type: 'Текст',
        routerLink: '',
      },
      {
        name: 'Лалла',
        type: 'Текст',
        routerLink: '',
      },
      {
        name: 'Лалла',
        type: 'Текст',
        routerLink: '',
      }
    ])
  }
}
