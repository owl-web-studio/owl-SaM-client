import { Component } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {NgForOf} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'owl-settings-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  constructor(
    private readonly accountService: AccountService,
    public readonly translate: TranslateService
  ) {
  }
}
