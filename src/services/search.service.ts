import { Injectable } from '@angular/core';
import {delay, map, of, tap} from "rxjs";
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
    console.log(`Searching in: ${root.name}`);

    if (root.name.includes(text)) {
      console.log(`Match found: ${root.name}`);
      result.push(root as unknown as Knowledge);
    }

    if (root.children) {
      for (let i = 0; i < root.children.length; i++) {
        this.getKnowledgesByText(text, root.children[i], result);
      }
    }

    return result;
  }

  search(query: string) {
    const randomDelay = 1000 + Math.random() * 2000;

    return this.spaceService.getData()
      .pipe(
        map(rootDirectory => {
          return this.getKnowledgesByText(
            query,
            rootDirectory,
            []
          )
        })
      )
      .pipe(
        delay(randomDelay),
        tap(v => console.log('found', v))
      )
  }
}
