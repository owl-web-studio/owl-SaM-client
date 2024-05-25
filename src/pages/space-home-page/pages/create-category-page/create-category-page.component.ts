import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'owl-create-category-page',
  standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        PaginatorModule,
        ReactiveFormsModule
    ],
  templateUrl: './create-category-page.component.html',
  styleUrl: './create-category-page.component.scss'
})
export class CreateCategoryPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  createCategoryForm;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
  ) {
    this.createCategoryForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }
  ngOnInit() {

  }

  onSubmit() {
    // TODO
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Категория была успешно создана!'
    });
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  onCancel() {
    this.createCategoryForm.reset();
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
