import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, ParamMap, Router, RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {map, Subject, switchMap, takeUntil, withLatestFrom} from "rxjs";
import {Space} from "../../entities/space.model";
import {TooltipModule} from "primeng/tooltip";
import {AsyncPipe} from "@angular/common";
import {ToolbarComponent} from "../../widgets/toolbar/toolbar.component";
import {TreeModule} from "primeng/tree";
import {MessageService, TreeDragDropService, TreeNode} from "primeng/api";
import {KnowledgeStructureService} from "../../services/knowledge-structure.service";
import {ContextMenuModule} from "primeng/contextmenu";

@Component({
  selector: 'owl-space-home-page',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    TooltipModule,
    AsyncPipe,
    ToolbarComponent,
    TreeModule,
    ContextMenuModule
  ],
  templateUrl: './space-home-page.component.html',
  styleUrl: './space-home-page.component.scss',
  providers: [TreeDragDropService]
})
export class SpaceHomePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  space: Space | undefined;
  files: TreeNode[] | undefined;

  treeKnowledgeMenuItems = [
    { label: 'Переименовать', icon: 'pi pi-fw pi-search' },
    { label: 'Удалить', icon: 'pi pi-fw pi-trash' }
  ];
  treeDirectoryMenuItems = [
    {
      label: 'Создать запись',
      icon: 'pi pi-fw pi-file-edit',
      routerLink: ['knowledge/create']
    },
    { label: 'Создать директорию', icon: 'pi pi-fw pi-folder-open' }
  ];

  constructor(
    private readonly router: Router,
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
          return this.spaceService.getSpaceInfo(Number(params.get('spaceId')))
        })
      )
      .subscribe((space: Space) => {
        this.space = space;
      });

    this.spaceService.getFileTree()
      .subscribe(value => {
        this.files = value;
      });

    this.spaceService.onUpdatedSpaceTree$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(_ => {
          return this.spaceService.getFileTree()
        })
      )
      .subscribe((v) => {
        this.files = v;
      })
  }

  openFolder(directoryId: number) {
    this.router.navigate(['directory/' + directoryId], {relativeTo: this.activatedRoute});
  }

  openKnowledge(knowledgeId: number) {
    this.router.navigate(['knowledge/' + knowledgeId], {relativeTo: this.activatedRoute});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
