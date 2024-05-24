import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {OrganizationService} from "../../../services/organization.service";
import {Organization} from "../../../entities/organization.model";
import {TooltipModule} from "primeng/tooltip";
import {CardModule} from "primeng/card";
import {UserService} from "../../../services/user.service";
import {AsyncPipe} from "@angular/common";
import {SpaceService} from "../../../services/space.service";

@Component({
  selector: 'owl-organization-home-page',
  standalone: true,
  imports: [
    TooltipModule,
    RouterLink,
    CardModule,
    AsyncPipe
  ],
  templateUrl: './organization-home-page.component.html',
  styleUrl: './organization-home-page.component.scss'
})
export class OrganizationHomePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  organization: Organization | undefined;

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService,
    private readonly spaceService: SpaceService,

  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.organizationService.getOrganizationInfo(Number(params.get('organizationId')))
        })
      )
      .subscribe((organization: Organization) => {
        this.organization = organization;
      });
  }

  get users$() {
    return this.userService.getUsers();
  }

  get spaces$() {
    return this.spaceService.getSpaces();
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
