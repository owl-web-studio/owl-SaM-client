import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {Space} from "../../entities/space.model";
import {Observable} from "rxjs";
import {AsyncPipe, NgClass} from "@angular/common";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'owl-toolbar',
  standalone: true,
  imports: [
    DividerModule,
    RouterLink,
    AsyncPipe,
    TooltipModule,
    NgClass
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  isCollapsed: boolean = false;

  spaces: Observable<Space[]>;

  constructor(
    private readonly spaceService: SpaceService
  ) {
    this.spaces = this.spaceService.getSpaces();
  }

  toggleToolbar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
