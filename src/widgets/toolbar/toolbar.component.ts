import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'owl-toolbar',
  standalone: true,
  imports: [
    DividerModule,
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

}
