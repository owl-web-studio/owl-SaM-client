import { Routes } from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {NotFoundPageComponent} from "../pages/not-found-page/not-found-page.component";
import {ProfilePageComponent} from "../pages/profile-page/profile-page.component";
import {SignInPageComponent} from "../pages/auth/sign-in-page/sign-in-page.component";
import {SignUpPageComponent} from "../pages/auth/sign-up-page/sign-up-page.component";
import {authGuard} from "../guards/auth.guard";
import {SettingsPageComponent} from "../pages/settings-page/settings-page.component";
import {SpaceHomePageComponent} from "../pages/space-home-page/space-home-page.component";
import {OrganizationHomePageComponent} from "../pages/organization/organization-home-page/organization-home-page.component";
import {UserPageComponent} from "../pages/users/user-page/user-page.component";
import {
  CreateKnowledgePageComponent
} from "../pages/space-home-page/pages/create-knowledge-page/create-knowledge-page.component";
import {
  CreateDirectoryPageComponent
} from "../pages/space-home-page/pages/create-directory-page/create-directory-page.component";
import {EditKnowledgePageComponent} from "../pages/space-home-page/pages/edit-knowledge-page/edit-knowledge-page.component";
import {
  EditOrganizationPageComponent
} from "../pages/organization/edit-organization-page/edit-organization-page.component";
import {SpaceInfoPageComponent} from "../pages/space-home-page/pages/space-info-page/space-info-page.component";
import {CreateUserPageComponent} from "../pages/users/create-user-page/create-user-page.component";
import {CreateUserGroupPageComponent} from "../pages/users/create-user-group-page/create-user-group-page.component";
import {ReferencePageComponent} from "../pages/reference-page/reference-page.component";
import {CreateRolePageComponent} from "../pages/roles/create-role-page/create-role-page.component";
import {DirectoryPageComponent} from "../pages/space-home-page/pages/directory-page/directory-page.component";
import {KnowledgePageComponent} from "../pages/space-home-page/pages/knowledge-page/knowledge-page.component";

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
    path: 'organizations/:organizationId',
    children: [
      {
        path: '',
        component: OrganizationHomePageComponent,
        title: 'Организация: главная',
        canActivate: [authGuard],
      },
      {
        path: 'edit',
        component: EditOrganizationPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        children: [
          { path: 'create', component: CreateUserPageComponent },

          { path:  ':userId', component: UserPageComponent},
        ],
        canActivate: [authGuard],
      },
      {
        path: 'groups',
        children: [
          { path: 'create', component: CreateUserGroupPageComponent },

          { path:  ':userGroupId', component: UserPageComponent},
        ],
        canActivate: [authGuard],
      },
      {
        path: 'spaces/:spaceId',
        children: [
          {
            path: '',
            component: SpaceHomePageComponent,
            title: 'Пространство: главная',
            canActivate: [authGuard],
            children: [
              {
                path: '',
                component: SpaceInfoPageComponent,
                pathMatch: 'full'
              },
              {
                path: 'roles',
                children: [
                  {
                    path: 'create',
                    component: CreateRolePageComponent
                  }
                ]
              },
              {
                path: 'directory',
                children: [
                  { path: 'create', component: CreateDirectoryPageComponent },

                  { path: ':directoryId', component: DirectoryPageComponent }
                ]
              },
              {
                path: 'knowledge',
                children: [
                  { path: 'create', component: CreateKnowledgePageComponent },

                  { path: ':knowledgeId', component: KnowledgePageComponent, pathMatch: 'full'},
                  { path: ':knowledgeId/edit', component: EditKnowledgePageComponent},
                ]
              }
            ]
          }
        ]
      },
    ]
  },
  {
    path: 'reference',
    component: ReferencePageComponent,
    title: 'Справка',
    canActivate: [authGuard],
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
