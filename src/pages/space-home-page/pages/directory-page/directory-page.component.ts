import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, switchMap, takeUntil} from "rxjs";
import {Knowledge} from "../../../../entities/knowledge.model";
import {MenuItem} from "primeng/api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SpaceService} from "../../../../services/space.service";
import {Directory} from "../../../../entities/directory.model";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'owl-directory-page',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule
  ],
  templateUrl: './directory-page.component.html',
  styleUrl: './directory-page.component.scss'
})
export class DirectoryPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  directory: Directory | undefined;

  items: MenuItem[] | undefined;

  home: MenuItem = { icon: 'pi pi-home', routerLink: '../../' };

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
        this.items = v.path.map(path => {
          return {
            label: path.name,
            routerLink: ['../../directory/' + path.id]
          }
        })
        this.items.push({
          label: this.directory?.name
        })
        console.log(this.directory)
      });


  }

  isDirectory(element: any) {
    return 'children' in element && Array.isArray((element as Directory).children);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
