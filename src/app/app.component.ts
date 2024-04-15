import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "../widgets/header/header.component";
import {ToolbarComponent} from "../widgets/toolbar/toolbar.component";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'owl-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ToolbarComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
