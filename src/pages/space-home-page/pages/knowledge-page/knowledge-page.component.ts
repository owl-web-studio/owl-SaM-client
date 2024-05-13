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
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {CategoryService} from "../../../../services/category.service";
import {AsyncPipe} from "@angular/common";

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
    FormsModule,
    MultiSelectModule,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './knowledge-page.component.html',
  styleUrl: './knowledge-page.component.scss'
})
export class KnowledgePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  breadcrumbMenuItems: MenuItem[] | undefined;
  home: MenuItem = { icon: 'pi pi-home', routerLink: '../../' };

  editKnowledgeForm: FormGroup | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
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

        this.editKnowledgeForm = this.formBuilder.group({
          id: [{ value: treeNode!.id, disabled: true }],
          name: treeNode!.name,
          categories: treeNode.categories,
          content: treeNode.content
        });

        this.breadcrumbMenuItems = path.map(path => {
          return {
            label: path.name,
            routerLink: ['../../directory/' + path.id]
          }
        });
        this.breadcrumbMenuItems.push({
          label: treeNode.name
        });
      });
  }

  get categories$() {
    return this.categoryService.getCategories();
  }

  get markdownContent() {
    return this.editKnowledgeForm!.controls["content"].getRawValue();
  }

  set markdownContent(value) {
    this.editKnowledgeForm!.controls["content"].setValue(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
