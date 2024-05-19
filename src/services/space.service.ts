import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";
import {Space} from "../entities/space.model";
import {map, Observable, of, Subject, switchMap, tap} from "rxjs";
import {Directory} from "../entities/directory.model";
import {Knowledge} from "../entities/knowledge.model";
import {TreeNode} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  onUpdatedSpaceTree$ = new Subject<void>();

  newEntityIdCount = 10;

  constructor(
    private readonly mockDataService: MockDataService
  ) { }

  getSpaceInfo(spaceId: number) {
    return this.mockDataService.getById('spaces', spaceId);
  }

  getSpaces() {
    return this.mockDataService.get('spaces') as Observable<Space[]>;
  }

  getData() {
    return this.mockDataService.get('knowledgeTree') as Observable<Directory>;
  }

  getFileTree() {
    console.log('getFileTree')
    return this.getData()
      .pipe(
        switchMap(rootDirectory => {
          console.log(this.convertToTreeNode(rootDirectory));
          return of([this.convertToTreeNode(rootDirectory)]);
        })
      )
  }

  private convertToTreeNode(directory: Directory | Knowledge): TreeNode {
    const isDirectory = 'children' in directory && Array.isArray((directory as Directory).children);

    const treeNode: TreeNode = {
      key: directory.id.toString(),
      label: directory.name,
      data: directory.id,
      children: [],
      type: isDirectory ? 'directory' : 'knowledge'
    };

    if ('children' in directory && directory.children) {
      directory.children.forEach(child => {
        treeNode.children?.push(this.convertToTreeNode(child));
      });
    }

    return treeNode;
  }

  private getElementById(
    root: Directory,
    id: number,
    path: { id: number, name: string }[] = []
  ): {
    treeNode: Directory | Knowledge | undefined,
    path: { id: number, name: string }[]
  } {
    if (root.id === id) return { treeNode: root, path };
    if (root.children) {
      for (let i = 0; i < root.children.length; i++) {
        // path.push({id: root.id, name: root.name})
        const found = this.getElementById(root.children[i], id, [...path, {id: root.id, name: root.name}]);
        if (found.treeNode) return found;
      }
    }
    return { treeNode: undefined, path: [] };
  }

  getKnowledgeById(id: number) {
    return this.getData()
      .pipe(
        map(root => {
          return this.getElementById(root, id) as {
            treeNode: Knowledge,
            path: { id: number, name: string }[]
          }
        })
      );
  }

  getDirectoryById(id: number) {
    return this.getData()
      .pipe(
        map(root => {
          return this.getElementById(root, id) as {
            treeNode: Directory,
            path: { id: number, name: string }[]
          }
        })
      );
  }


  addDirectory(data: any, rootDirectoryId: number) {

  }

  addKnowledge(data: any, rootDirectoryId: number) {
    return this.getDirectoryById(rootDirectoryId)
      .pipe(
        tap(_ => {
          const {treeNode, path} = _;

          treeNode.children?.push({
            id: this.newEntityIdCount,
            ...data
          })
          this.newEntityIdCount++;

        }),
        map(_ => 1)
      ).subscribe(_ => {
        console.log('sub', this.mockDataService.knowledgeTree)
        this.onUpdatedSpaceTree$.next();
      })
  }

  getKnowledgeRating(id: number) {
    return this.mockDataService.getById('rating', id);
  }

  setUserRate(knowledgeId: number, userId: number, rate: number) {
    return this.mockDataService.getById('rating', knowledgeId)
      .pipe(
        map(v => {
          if (v) {
            const userRate = v.userRating.find((userRate: any) => {
              return userRate.userId === userId;
            });

            if (userRate) {
              userRate.rating = rate;
            } else {
              v.push({
                userId: userId,
                rating: rate
              })
            }

            this.mockDataService.getById('rating', knowledgeId)
              .subscribe(v => { console.log(v) })

            return 1;
          } else {
            return this.mockDataService.post('rating', {
              knowledgeId: knowledgeId,
              userRating: [
                {
                  userId: userId,
                  rating: rate
                }
              ]
            })
          }
        })
      )
  }
}
