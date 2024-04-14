import { Component } from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ToolbarComponent} from "../../widgets/toolbar/toolbar.component";
import {RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";

@Component({
  selector: 'owl-home-page',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    ButtonModule,
    ToolbarComponent,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'owl-SaM';

  constructor(
    private readonly spaceService: SpaceService,
  ) {
  }

  get spaces$() {
    return this.spaceService.getSpaces();
  }
}
