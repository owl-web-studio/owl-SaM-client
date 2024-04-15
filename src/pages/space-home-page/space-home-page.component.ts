import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {Observable, Subject, switchMap, takeUntil} from "rxjs";
import {Space} from "../../entities/space.model";
import {TooltipModule} from "primeng/tooltip";
import {AsyncPipe} from "@angular/common";
import {ToolbarComponent} from "../../widgets/toolbar/toolbar.component";
import {TreeModule} from "primeng/tree";
import {MessageService, TreeDragDropService, TreeNode} from "primeng/api";
import {KnowledgeStructureService} from "../../services/knowledge-structure.service";

@Component({
  selector: 'owl-space-home-page',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    TooltipModule,
    AsyncPipe,
    ToolbarComponent,
    TreeModule
  ],
  templateUrl: './space-home-page.component.html',
  styleUrl: './space-home-page.component.scss',
  providers: [TreeDragDropService]
})
export class SpaceHomePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  space: Space | undefined;
  files: TreeNode[] | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService,
    private readonly knowledgeStructureService: KnowledgeStructureService,

    private readonly messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.spaceService.getSpaceInfo(Number(params.get('id')))
        })
      )
      .subscribe((space: Space) => {
        this.space = space;
      });

    this.spaceService.getFileTree()
      .subscribe(value => {
        this.files = value;
      });
  }

  openFolder(knowledgeId: number) {
    this.messageService.add({
      severity: 'success',
      summary: 'Клик',
      detail: 'Клик'
    })
  }

  openKnowledge(knowledgeId: number) {
    this.messageService.add({
      severity: 'success',
      summary: 'Событие',
      detail: 'Открыто знание'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
