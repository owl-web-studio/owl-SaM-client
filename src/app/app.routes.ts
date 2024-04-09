import { Routes } from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {NotFoundPageComponent} from "../pages/not-found-page/not-found-page.component";
import {SpaceInfoPageComponent} from "../pages/space-info-page/space-info-page.component";
import {ProfilePageComponent} from "../pages/profile-page/profile-page.component";
import {SignInPageComponent} from "../pages/auth/sign-in-page/sign-in-page.component";
import {SignUpPageComponent} from "../pages/auth/sign-up-page/sign-up-page.component";
import {authGuard} from "../guards/auth.guard";

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
    path: 'space',
    children: [
      {
        path: 'info',
        component: SpaceInfoPageComponent,
        title: 'Пространство',
        canActivate: [authGuard],
      },
    ]
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    title: 'Профиль',
    data: {title: 'ssss'},
    canActivate: [authGuard],
  },

  { path: '**', component: NotFoundPageComponent, title: 'Страница 404' }
];
