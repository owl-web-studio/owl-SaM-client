import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FormatService} from "../../../../services/format.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {Format} from "../../../../entities/format.model";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MarkdownComponent} from "ngx-markdown";
import {SplitterModule} from "primeng/splitter";
import {KnowledgeFormatType} from "../../../../entities/knowledge-format-type";
import {FileUploadEvent, FileUploadModule} from "primeng/fileupload";
import {AsyncPipe} from "@angular/common";
import {MultiSelectModule} from "primeng/multiselect";
import {CategoryService} from "../../../../services/category.service";
import {Knowledge} from "../../../../entities/knowledge.model";
import {SpaceService} from "../../../../services/space.service";

@Component({
  selector: 'owl-create-edit-knowledge-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    MarkdownComponent,
    SplitterModule,
    FormsModule,
    FileUploadModule,
    AsyncPipe,
    MultiSelectModule
  ],
  templateUrl: './create-knowledge-page.component.html',
  styleUrl: './create-knowledge-page.component.scss'
})
export class CreateKnowledgePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  createKnowledgeForm;
  availableFormats: Format[] = [];

  uploadedFile: any | undefined;

  intellectualPropertyOptions = [
    {
      name: 'Документ, связанный с программами для электронных вычислительных машин (программы для ЭВМ)',
    },
    {
      name: 'Документ о базах данных',
    },
    {
      name: 'Изобретение',
    },
    {
      name: 'Полезная модель',
    },
    {
      name: 'Секрет производства (ноу-хау)'
    },
    {
      name: 'Фирменное наименование'
    },
    {
      name: 'Товарный знак/знак обслуживания'
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly formatService: FormatService,
    private readonly categoryService: CategoryService,
    private readonly spaceService: SpaceService,
  ) {
    this.createKnowledgeForm = this.formBuilder.group({
      name: '',
      format: '',
      categories: '',
      content: '',
      description: '',
      intPropType: ''
    } as {
      name: '',
      format: any,
      categories: any,
      content: any,
      description: any,
      intPropType: any
    });
  }

  ngOnInit() {
    this.formatService.getFormats()
      .pipe(takeUntil(this.destroy$))
      .subscribe(formats => {
        this.availableFormats = formats as Format[];
      });
  }

  get categories$() {
    return this.categoryService.getCategories();
  }

  get formatType() {
    if (this.createKnowledgeForm!.controls["format"].getRawValue() && (this.createKnowledgeForm!.controls["format"].getRawValue() as unknown as Format).type) {
      return (this.createKnowledgeForm!.controls["format"].getRawValue() as unknown as Format).type;
    } else {
      return ''
    }
  }

  get markdownContent() {
    return this.createKnowledgeForm!.controls["content"].getRawValue() as string;
  }

  set markdownContent(value) {
    this.createKnowledgeForm!.controls["content"].setValue(value);
  }

  onClearFormat() {
    this.createKnowledgeForm!.controls["content"].reset();
    this.createKnowledgeForm!.controls["format"].reset();
  }

  onSubmit() {
    // TODO
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно!',
      detail: 'Запись была успешно создана!'
    });
    // this.clientsService.createClient(this.createClientForm.value)
    console.log(this.createKnowledgeForm.value)
    const knowledge = {
      ...this.createKnowledgeForm.value,
      createTime: new Date(),
      updateTime: new Date()
    };
    this.spaceService.addKnowledge(knowledge, 1);
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  }

  onCancel() {
    this.createKnowledgeForm.reset();
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  }

  onUpload($event: FileUploadEvent) {
    console.log($event);
    const file = $event.files[0];
    const objectURL = URL.createObjectURL(file);
    this.uploadedFile = file; // Сохраняем файл и его URL
    this.uploadedFile.objectURL = objectURL;
    this.createKnowledgeForm.controls['content'].setValue(this.uploadedFile);
    console.log(this.createKnowledgeForm);
    console.log(objectURL); // Выводим URL для проверки
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    // if (this.uploadedFile?.objectURL) {
    //   URL.revokeObjectURL(this.uploadedFile.objectURL);
    // }
  }
}
