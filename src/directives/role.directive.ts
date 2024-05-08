import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {Role} from "../entities/role.model";

@Directive({
  selector: '[owlRole]',
  standalone: true
})
export class RoleDirective implements AfterViewInit {
  @Input() role!: Role;

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit(): void {
    if (this.role.isAdmin) {
      this.el.nativeElement.style.fontWeight = '700';
    }

    if (this.role.displayColor) {
      this.el.nativeElement.style.color = this.role.displayColor;
    }
  }
}
