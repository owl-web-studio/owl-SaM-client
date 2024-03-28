import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'owl-toolbar',
  standalone: true,
  imports: [
    DividerModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

}
