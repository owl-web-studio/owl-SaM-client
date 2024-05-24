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
      console.log(`Match name found: ${root.name}`);
      result.push(root as any);
    }

    if (
      'content' in root &&
      (root as Knowledge).format.type === 'markdown' &&
      ((root as Knowledge).content as string).includes(text)
    ) {
      console.log(`Match content found: ${root.name}`);
      result.push(root as Knowledge);
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
        }),
        map(foundElements => {
          return foundElements.map(element => {
            return {
              id: element.id,
              name: element.name,
              type: (element as unknown as any).children ? 'Директория' : element.format.name,
            }
          })
        })
      )
      .pipe(
        delay(randomDelay),
        tap(v => console.log('found', v))
      )
  }
}
