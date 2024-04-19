import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'owl-create-user-page',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.scss'
})
export class CreateUserPageComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();

  createUserForm;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
  ) {
    this.createUserForm = this.formBuilder.group({
      login: '',
      password: '',

      firstName: '',
      lastName: '',
      patronymic: '',
      email: '',
      phoneNumber: '',
      jobTitle: '',
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    // TODO
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Пользователь был успешно создан!'
    });
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  onCancel() {
    this.createUserForm.reset();
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
