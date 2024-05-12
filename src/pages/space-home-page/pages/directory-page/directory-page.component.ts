import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, switchMap, takeUntil} from "rxjs";
import {Knowledge} from "../../../../entities/knowledge.model";
import {MenuItem} from "primeng/api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SpaceService} from "../../../../services/space.service";
import {Directory} from "../../../../entities/directory.model";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {ContextMenu, ContextMenuModule} from "primeng/contextmenu";

@Component({
  selector: 'owl-directory-page',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,
    ContextMenuModule
  ],
  templateUrl: './directory-page.component.html',
  styleUrl: './directory-page.component.scss'
})
export class DirectoryPageComponent implements OnInit, OnDestroy {
  @ViewChild('cm') cm!: ContextMenu;

  private destroy$ = new Subject<void>();
  directory: Directory | undefined;

  menuItems: MenuItem[] = [];

  knowledgeMenuItems = [
    {label: 'Открыть', icon: 'pi pi-arrow-up-right'},
    {label: 'Переименовать', icon: 'pi pi-search'},
    {label: 'Удалить', icon: 'pi pi-trash'}
  ];
  directoryMenuItems = [
    {label: 'Открыть', icon: 'pi pi-arrow-up-right'},
    {label: 'Переименовать', icon: 'pi pi-file-edit'},
    {label: 'Удалить', icon: 'pi pi-trash'}
  ];
  containerMenuItems = [
    {
      label: 'Создать запись',
      icon: 'pi pi-file-plus',
      routerLink: ['knowledge/create']
    },
    {
      label: 'Создать директорию',
      icon: 'pi pi-folder-plus',
      routerLink: ['directory/create']
    }
  ];

  breadcrumbItems: MenuItem[] | undefined;
  home: MenuItem = {icon: 'pi pi-home', routerLink: '../../'};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.spaceService.getKnowledgeById(Number(params.get('id')));
        }),
      )
      .subscribe((v) => {
        console.log(v)

        this.directory = v.node;
        this.breadcrumbItems = v.path.map(path => {
          return {
            label: path.name,
            routerLink: ['../../directory/' + path.id]
          }
        })
        this.breadcrumbItems.push({
          label: this.directory?.name
        })
        console.log(this.directory)
      });


  }

  isDirectory(element: any) {
    return 'children' in element && Array.isArray((element as Directory).children);
  }

  onContextMenu(event: any, element?: any) {
    if (element && this.isDirectory(element)) {
      this.menuItems = this.directoryMenuItems;
    } else if (element && !this.isDirectory(element)) {
      this.menuItems = this.knowledgeMenuItems;
    } else {
      this.menuItems = this.containerMenuItems;
    }

    this.cm.show(event);
  }

  onHide() {
    this.menuItems = [];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
