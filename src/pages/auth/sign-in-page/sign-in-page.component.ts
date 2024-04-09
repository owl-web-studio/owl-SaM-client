import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../entities/user.model";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'owl-sign-in-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  authForm;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {
    this.authForm = this.formBuilder.group({
      login: '',
      password: '',
    });
  }

  ngOnInit() {
    if (this.authService.currentUser$.value) {
      this.router.navigate(['/']);
    }
  }

  signIn() {
    this.authService.signIn(
      this.authForm.value['login']!,
      this.authForm.value['password']!
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (currentUser: User) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успешно',
            detail: `Выполнен вход под ${currentUser.login}`
          });
          this.authForm.reset();
          this.router.navigate(['/']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Неверный пароль или пользователь не существует!'
          });
          this.authForm.reset();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
