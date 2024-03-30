import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'owl-organization-page',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule
  ],
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss'
})
export class OrganizationPageComponent {

}
