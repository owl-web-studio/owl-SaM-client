import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Subject, switchMap, takeUntil} from "rxjs";
import {Knowledge} from "../../../../entities/knowledge.model";
import {MenuItem, MessageService} from "primeng/api";
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

  containerMenuItems = [
    {
      label: 'Создать запись',
      icon: 'pi pi-file-plus',
      routerLink: ['../../knowledge/create']
    },
    {
      label: 'Создать директорию',
      icon: 'pi pi-folder-plus',
      routerLink: ['../../directory/create']
    },
    {
      label: 'Удалить директорию',
      icon: 'pi pi-fw pi-trash'
    },
  ];

  breadcrumbItems: MenuItem[] | undefined;
  home: MenuItem = {icon: 'pi pi-home', routerLink: '../../'};

  constructor(
    private readonly activatedRoute: ActivatedRoute,

    private readonly messageService: MessageService,
    private readonly spaceService: SpaceService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.spaceService.getDirectoryById(Number(params.get('directoryId')));
        }),
      )
      .subscribe((v) => {
        const {treeNode, path} = v;

        this.directory = treeNode;
        this.breadcrumbItems = v.path.map(path => {
          return {
            label: path.name,
            routerLink: ['../../directory/' + path.id]
          }
        })
        this.breadcrumbItems.push({
          label: this.directory?.name
        })
      });
  }

  isDirectory(element: any) {
    return 'children' in element && Array.isArray((element as Directory).children);
  }

  onContextMenu(event: any, element?: any) {
    if (element && this.isDirectory(element)) {
      this.menuItems = [
        {label: 'Открыть', icon: 'pi pi-arrow-up-right', routerLink: ['../../directory/' + element.id]},
        {label: 'Редактировать', icon: 'pi pi-file', routerLink: ['../../directory/' + element.id + '/edit']},
        {label: 'Удалить', icon: 'pi pi-trash'}
      ];
    } else if (element && !this.isDirectory(element)) {
      this.menuItems = [
        {label: 'Открыть', icon: 'pi pi-arrow-up-right', routerLink: ['../../knowledge/' + element.id]},
        {label: 'Редактировать', icon: 'pi pi-file', routerLink: ['../../knowledge/' + element.id + '/edit']},
        {label: 'Удалить', icon: 'pi pi-trash'}
      ];
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
