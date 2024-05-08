import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ColorPicker, ColorPickerModule} from "primeng/colorpicker";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'owl-create-role-page',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ColorPickerModule
  ],
  templateUrl: './create-role-page.component.html',
  styleUrl: './create-role-page.component.scss'
})
export class CreateRolePageComponent implements OnInit {
  createRoleForm;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly roleService: RoleService
  ) {
    this.createRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      displayColor: ''
    })
  }

  ngOnInit(): void {
  }

  public onColorChanged(color: ColorPicker): void {
    color.writeValue(color.inputBgColor);
    color.onModelChange(color.inputBgColor);
  }

  onSubmit() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Роль была успешно создана!'
    });
    this.roleService.createRole(this.createRoleForm.value)
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  onCancel() {
    this.createRoleForm.reset();
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
