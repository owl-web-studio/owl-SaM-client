import {Component} from '@angular/core';
import {TooltipModule} from "primeng/tooltip";
import {DividerModule} from "primeng/divider";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'owl-header',
  standalone: true,
  imports: [
    TooltipModule,
    DividerModule,
    AsyncPipe,
    RouterLink,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title$: BehaviorSubject<string>;

  accountMenuItems: MenuItem[] = [
    {
      label: 'Личный кабинет',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/profile']);
      }
    },
    {
      label: 'Настройки',
      icon: 'pi pi-cog',
      command: () => {
        this.router.navigate(['/settings']);
      },
    },
    {
      label: 'Выйти из аккаунта',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout().subscribe(() => {
          window.location.reload()
        });
      }
    }
  ];

  constructor(
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly authService: AuthService
  ) {
    this.title$ = breadcrumbService.title$;
  }
}
