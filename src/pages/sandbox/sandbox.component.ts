import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {TreeSelectModule} from "primeng/treeselect";
import {SelectButtonModule} from "primeng/selectbutton";
import {UserService} from "../../services/user.service";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import { User } from '../../entities/user.model';
import {CardModule} from "primeng/card";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";

@Component({
  selector: 'owl-sandbox',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DropdownModule,
    DividerModule,
    CheckboxModule,
    TreeSelectModule,
    SelectButtonModule,
    AsyncPipe,
    CardModule,
    TriStateCheckboxModule
  ],
  templateUrl: './sandbox.component.html',
  styleUrl: './sandbox.component.scss'
})
export class SandboxComponent {
  selectorTypeOptions = [
    { name: 'Роль', value: 1 },
    { name: 'Группа пользователей', value: 2 },
    { name: 'Пользователь', value: 3 }
  ];
  selectorOptions = [
    { name: 'Группа аналитиков', code: 'NY' },
    { name: '', code: 'RM' },
    { name: '', code: 'LDN' },
    { name: '', code: 'IST' },
    { name: '', code: 'PRS' }
  ]

  constructor(
    private readonly userService: UserService
  ) {
  }

  get users$() {
    return this.userService.getUsers() as Observable<User[]>;
  }
}
