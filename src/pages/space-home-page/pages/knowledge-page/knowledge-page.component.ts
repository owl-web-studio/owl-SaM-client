import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {Knowledge} from "../../../../entities/knowledge.model";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";
import {SpaceService} from "../../../../services/space.service";
import {SplitterModule} from "primeng/splitter";
import {MarkdownComponent} from "ngx-markdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'owl-knowledge-page',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    BreadcrumbModule,
    SplitterModule,
    MarkdownComponent,
    InputTextareaModule,
    FormsModule
  ],
  templateUrl: './knowledge-page.component.html',
  styleUrl: './knowledge-page.component.scss'
})
export class KnowledgePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  knowledge: Knowledge | undefined;

  items: MenuItem[] | undefined;

  home: MenuItem = { icon: 'pi pi-home', routerLink: '../../' };

  content: string | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService
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
        console.log(v)

        this.knowledge = v.node as Knowledge;
        this.items = v.path.map(path => {
          return {
            label: path.name,
            routerLink: ['../../directory/' + path.id]
          }
        });
        this.items.push({
          label: this.knowledge.name
        });
      });
  }

  get markdownContent() {
    return this.knowledge!.content
  }

  set markdownContent(value) {
    this.knowledge!.content = value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
