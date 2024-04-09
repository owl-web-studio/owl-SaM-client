import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'owl-home-page',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    ButtonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'owl-SaM';

}
