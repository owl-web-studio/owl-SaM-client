import { Injectable } from '@angular/core';
import {delay, map, of} from "rxjs";
import {SpaceService} from "./space.service";
import {Directory} from "../entities/directory.model";
import {Knowledge} from "../entities/knowledge.model";

export interface searchElement {
  name: string,
  type: string,
  routerLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private readonly spaceService: SpaceService
  ) { }

  private getKnowledgesByText(
    text: string,
    root: Directory,
    result: Knowledge[] = []
  ): Knowledge[] {
    if (root.name === text) return [root as unknown as Knowledge];
    if (root.children) {
      for (let i = 0; i < root.children.length; i++) {
        // path.push({id: root.id, name: root.name})
        const found = this.getKnowledgesByText(text, root.children[i], [...result, root as unknown as Knowledge]);
        if (found) return found;
      }
    }
    return [];
  }

  search(query: string) {
    this.spaceService.getData()
      .pipe(
        map(rootDirectory => {
          return this.getKnowledgesByText(
            query,
            rootDirectory,
            []
          )
        })
      )
      .subscribe(_ => {
        console.log(_)
      })

    console.log('search')
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
      .pipe(
        delay(1000),
      )
  }
}
