import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {ToolbarComponent} from "../../widgets/toolbar/toolbar.component";

@Component({
  selector: 'owl-reference-page',
  standalone: true,
    imports: [
        AsyncPipe,
        ToolbarComponent
    ],
  templateUrl: './reference-page.component.html',
  styleUrl: './reference-page.component.scss'
})
export class ReferencePageComponent {

}
