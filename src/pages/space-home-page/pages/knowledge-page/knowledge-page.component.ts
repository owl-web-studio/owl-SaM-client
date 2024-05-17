import {Component, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {Subject, switchMap, takeUntil} from "rxjs";
import {MenuItem} from "primeng/api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SpaceService} from "../../../../services/space.service";
import {CategoryService} from "../../../../services/category.service";
import {Knowledge} from "../../../../entities/knowledge.model";
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'owl-knowledge-page',
  standalone: true,
  imports: [
    BreadcrumbModule,
    MarkdownComponent
  ],
  templateUrl: './knowledge-page.component.html',
  styleUrl: './knowledge-page.component.scss'
})
export class KnowledgePageComponent implements OnInit {
  private destroy$ = new Subject<void>();

  knowledge: Knowledge | undefined;

  breadcrumbMenuItems: MenuItem[] | undefined;
  home: MenuItem = { icon: 'pi pi-home', routerLink: '../../' };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService,
    private readonly categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.spaceService.getKnowledgeById(Number(params.get('id')));
        }),
      )
      .subscribe((v) => {
        const {treeNode, path} = v;
        console.log(treeNode)

        this.breadcrumbMenuItems = path.map(path => {
          return {
            label: path.name,
            routerLink: ['../../directory/' + path.id]
          }
        });
        this.breadcrumbMenuItems.push({
          label: treeNode.name
        });

        this.knowledge = treeNode
      });
  }
}
