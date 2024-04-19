import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'owl-create-user-group-page',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextareaModule
  ],
  templateUrl: './create-user-group-page.component.html',
  styleUrl: './create-user-group-page.component.scss'
})
export class CreateUserGroupPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  createGroupForm;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
  ) {
    this.createGroupForm = this.formBuilder.group({
      name: '',
      description: '',
      users: '',
    });
  }
  ngOnInit() {

  }

  onSubmit() {
    // TODO
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Группа пользователей была успешно создана!'
    });
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  onCancel() {
    this.createGroupForm.reset();
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
