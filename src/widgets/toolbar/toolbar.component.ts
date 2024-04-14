import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {AsyncPipe, NgClass} from "@angular/common";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'owl-toolbar',
  standalone: true,
  imports: [
    DividerModule,
    AsyncPipe,
    TooltipModule,
    NgClass
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  isCollapsed: boolean = false;

  toggleToolbar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
