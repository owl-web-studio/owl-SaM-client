import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {Space} from "../../entities/space.model";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'owl-toolbar',
  standalone: true,
  imports: [
    DividerModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  spaces: Observable<Space[]>;

  constructor(
    private readonly spaceService: SpaceService
  ) {
    this.spaces = this.spaceService.getSpaces();
  }
}
