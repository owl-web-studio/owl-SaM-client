import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Space} from "../../../../entities/space.model";
import {SpaceService} from "../../../../services/space.service";
import {RoleService} from "../../../../services/role.service";
import {CategotyService} from "../../../../services/categoty.service";
import {FormatService} from "../../../../services/format.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'owl-space-info-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CardModule,
    TooltipModule
  ],
  templateUrl: './space-info-page.component.html',
  styleUrl: './space-info-page.component.scss'
})
export class SpaceInfoPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  space: Space | undefined;

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService,
    private readonly roleService: RoleService,
    private readonly categoryService: CategotyService,
    private readonly formatService: FormatService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.spaceService.getSpaceInfo(Number(params.get('id')))
        })
      )
      .subscribe((organization: Space) => {
        this.space = organization;
      });
  }

  get roles$() {
    return this.roleService.getRoles();
  }

  get categories$() {
    return this.categoryService.getCategories();
  }

  get formats$() {
    return this.formatService.getFormats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
