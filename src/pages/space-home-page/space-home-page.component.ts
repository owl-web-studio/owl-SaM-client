import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {Subject, switchMap, takeUntil} from "rxjs";
import {Space} from "../../entities/space.model";
import {TooltipModule} from "primeng/tooltip";
import {AsyncPipe} from "@angular/common";
import {ToolbarComponent} from "../../widgets/toolbar/toolbar.component";
import {TreeModule} from "primeng/tree";
import {TreeNode} from "primeng/api";
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
  styleUrl: './space-home-page.component.scss'
})
export class SpaceHomePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  space: Space | undefined;
  files: TreeNode[] = [
    {
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          children: [
            { key: '0-0-0', label: 'Expenses.doc', data: 'Expenses Document' },
            { key: '0-0-1', label: 'Resume.doc', data: 'Resume Document' }
          ]
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          children: [{ key: '0-1-0', label: 'Invoices.txt', data: 'Invoices for this month' }]
        }
      ]
    },
    {
      key: '1',
      label: 'Events',
      data: 'Events Folder',
      children: [
        { key: '1-0', label: 'Meeting', data: 'Meeting' },
        { key: '1-1', label: 'Product Launch', data: 'Product Launch' },
        { key: '1-2', label: 'Report Review', data: 'Report Review' }
      ]
    },
    {
      key: '2',
      label: 'Movies',
      data: 'Movies Folder',
      children: [
        {
          key: '2-0',
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            { key: '2-0-0', label: 'Scarface', data: 'Scarface Movie' },
            { key: '2-0-1', label: 'Serpico', data: 'Serpico Movie' }
          ]
        },
        {
          key: '2-1',
          label: 'Robert De Niro',
          data: 'De Niro Movies',
          children: [
            { key: '2-1-0', label: 'Goodfellas', data: 'Goodfellas Movie' },
            { key: '2-1-1', label: 'Untouchables', data: 'Untouchables Movie' }
          ]
        }
      ]
    }
  ];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService,
    private readonly knowledgeStructureService: KnowledgeStructureService
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
