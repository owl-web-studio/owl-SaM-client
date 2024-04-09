import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'owl-space-info-page',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule
  ],
  templateUrl: './space-info-page.component.html',
  styleUrl: './space-info-page.component.scss'
})
export class SpaceInfoPageComponent {

}
