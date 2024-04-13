import { Routes } from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {NotFoundPageComponent} from "../pages/not-found-page/not-found-page.component";
import {SpaceInfoPageComponent} from "../pages/space-info-page/space-info-page.component";
import {ProfilePageComponent} from "../pages/profile-page/profile-page.component";
import {SignInPageComponent} from "../pages/auth/sign-in-page/sign-in-page.component";
import {SignUpPageComponent} from "../pages/auth/sign-up-page/sign-up-page.component";
import {authGuard} from "../guards/auth.guard";
import {SettingsPageComponent} from "../pages/settings-page/settings-page.component";
import {SpaceHomePageComponent} from "../pages/space-home-page/space-home-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Главная',
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: '/auth/sign-in', pathMatch: "full" },
      { path: 'sign-in', component: SignInPageComponent },
      { path: 'sign-up', component: SignUpPageComponent }
    ]
  },

  {
    path: 'space/:id',
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      {
        path: 'info',
        component: SpaceInfoPageComponent,
        title: 'Информация о пространстве',
        canActivate: [authGuard],
      },
      {
        path: 'home',
        component: SpaceHomePageComponent,
        title: 'Пространство: главная',
        canActivate: [authGuard],
      }
    ]
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    title: 'Профиль',
    data: {title: 'ssss'},
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    title: 'Настройки',
    canActivate: [authGuard],
  },

  { path: '**', component: NotFoundPageComponent, title: 'Страница 404' }
];
