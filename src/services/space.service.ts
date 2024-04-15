import { Injectable } from '@angular/core';
import {MockDataService} from "./_mock/mock-data.service";
import {Space} from "../entities/space.model";
import {Observable, of, switchMap} from "rxjs";
import {Directory} from "../entities/directory.model";
import {Knowledge} from "../entities/knowledge.model";
import {TreeNode} from "primeng/api";

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
    return this.mockDataService.get('spaces') as Observable<Space[]>;
  }

  getData() {
    return this.mockDataService.get('knowledgeTree') as Observable<Directory>;
  }

  getFileTree() {
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
}
