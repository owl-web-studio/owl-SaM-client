import { Routes } from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {NotFoundPageComponent} from "../pages/not-found-page/not-found-page.component";
import {OrganizationPageComponent} from "../pages/organization-page/organization-page.component";
import {ProfilePageComponent} from "../pages/profile-page/profile-page.component";

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Главная' },
  { path: 'organization', component: OrganizationPageComponent, title: 'Моя организация' },
  { path: 'profile', component: ProfilePageComponent, title: 'Профиль', data: {title: 'ssss'} },

  { path: '**', component: NotFoundPageComponent, title: 'Страница 404' }
];
