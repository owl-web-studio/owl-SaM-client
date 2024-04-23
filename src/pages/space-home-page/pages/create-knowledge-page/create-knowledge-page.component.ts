import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FormatService} from "../../../../services/format.service";
import {Subject, takeUntil} from "rxjs";
import {Format} from "../../../../entities/format.model";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'owl-create-knowledge-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule
  ],
  templateUrl: './create-knowledge-page.component.html',
  styleUrl: './create-knowledge-page.component.scss'
})
export class CreateKnowledgePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  createKnowledgeForm;
  availableFormats: Format[] = [];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly formatService: FormatService
  ) {
    this.createKnowledgeForm = this.formBuilder.group({
      format: '',
      categories: '',
      content: '',
    });
  }

  ngOnInit() {
    this.formatService.getFormats()
      .pipe(takeUntil(this.destroy$))
      .subscribe(formats => {
        this.availableFormats = formats as Format[];
      });
  }

  onSubmit() {
    // TODO
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Запись была успешно создана!'
    });
    // this.clientsService.createClient(this.createClientForm.value)
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  onCancel() {
    this.createKnowledgeForm.reset();
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
