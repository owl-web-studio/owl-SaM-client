import {Injectable} from '@angular/core';
import {catchError, delay, forkJoin, map, Observable, of, switchMap, tap, timeout} from "rxjs";
import {SpaceService} from "./space.service";
import {Directory} from "../entities/directory.model";
import {Knowledge} from "../entities/knowledge.model";
import {element} from "three/examples/jsm/nodes/shadernode/ShaderNode";

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
  ) {
  }

  private calculateP(element: Knowledge, query: string): Observable<number> {
    const N = (query.length / element.name.length) * 100;

    if ((element as any).children) {
      return of(N * 0.6);
    } else {
      return this.spaceService.getKnowledgeRating(element.id)
        .pipe(
          map(rating => {
            const averageRating = rating.userRating.reduce(
              (acc: number, cv: any) => {
                return acc + cv.rating;
              },
              0
            ) / rating.userRating.length;

            const content = (element as any).content || '';
            const regex = new RegExp(query, 'gi');

            const R = averageRating || 0;

            if (
              'content' in element &&
              (element as Knowledge).format.type === 'markdown'
            ) {
              const C = (content.match(regex) || []).length;
              return (N * 0.6 + C * 0.4 + R * 0.2);
            } else {
              return (N * 0.6 + R * 0.2);
            }
          })
        );
    }
  }

  private getKnowledgesByText(
    text: string,
    root: Directory,
    result: Knowledge[] = []
  ): Knowledge[] {
    if (root.name.includes(text)) {
      result.push(root as any);
    }

    if (
      'content' in root &&
      (root as Knowledge).format.type === 'markdown' &&
      ((root as Knowledge).content as string).includes(text)
    ) {
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
        switchMap(rootDirectory => {
          const foundElements = this.getKnowledgesByText(
            query,
            rootDirectory,
            []
          )
          console.log('foundElements', foundElements)
          if (foundElements.length === 0) {

            console.log('no')
            return of([]);
          }

          return forkJoin(
            foundElements.map(element => {
              console.log('forkJoin')
              return this.calculateP(element, query)
                .pipe(
                  map(rating => {
                    return {
                      ...element,
                      P: rating
                    }
                  })
                )
            })
          )
        }),
        map(foundElementsWithP => {
          console.log('no match')

          return foundElementsWithP
            .filter((element, index, self) =>
                index === self.findIndex((t) => (
                  t.id === element.id
                ))
            )
            .sort((a, b) => b.P - a.P)
            .map((element: any) => {
              return {
                id: element.id,
                name: element.name,
                type: (element as unknown as any).children ? 'Директория' : element.format.name,
              }
            })
        }),
        tap(_ => {console.log('tap', _)}),
        delay(randomDelay),
      )
  }
}
