import { Component } from '@angular/core';
import {TooltipModule} from "primeng/tooltip";
import {DividerModule} from "primeng/divider";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'owl-header',
  standalone: true,
  imports: [
    TooltipModule,
    DividerModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title$: BehaviorSubject<string>;

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) {
    this.title$ = breadcrumbService.title$;
  }
}
