import { Component } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'owl-settings-page',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    DividerModule,
    ButtonModule
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
