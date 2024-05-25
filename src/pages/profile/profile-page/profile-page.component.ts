import { Component } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {AsyncPipe} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {RoleDirective} from "../../../directives/role.directive";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'owl-profile-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DividerModule,
    RoleDirective,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  constructor(
    private readonly accountService: AccountService
  ) {
  }

  get profileInfo$() {
    return this.accountService.getProfileInfo();
  }
}
