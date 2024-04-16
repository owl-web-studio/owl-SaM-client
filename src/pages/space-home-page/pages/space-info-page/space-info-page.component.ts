import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {Space} from "../../../../entities/space.model";
import {SpaceService} from "../../../../services/space.service";
import {RoleService} from "../../../../services/role.service";
import {CategotyService} from "../../../../services/categoty.service";
import {FormatService} from "../../../../services/format.service";
import {TooltipModule} from "primeng/tooltip";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'owl-space-info-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CardModule,
    TooltipModule,
    RouterLink
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
    private readonly formatService: FormatService,
    private readonly userService: UserService
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

  get usersRoles$() {
    return this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
