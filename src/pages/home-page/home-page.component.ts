import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ToolbarComponent} from "../../widgets/toolbar/toolbar.component";
import {RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {BehaviorSubject, Subject, switchMap, takeUntil} from "rxjs";
import {Space} from "../../entities/space.model";
import {OrganizationService} from "../../services/organization.service";
import {Organization} from "../../entities/organization.model";

@Component({
  selector: 'owl-home-page',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    ButtonModule,
    ToolbarComponent,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  title = 'owl-SaM';

  openedOrganization$ = new BehaviorSubject<undefined | Organization>(undefined);
  openOrganization$ = new Subject<number>();

  constructor(
    private readonly organizationService: OrganizationService
  ) {
    this.openOrganization$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((organizationId: number) => {
          return this.organizationService.getOrganizationInfo(organizationId);
        })
      )
      .subscribe(organization => {
        this.openedOrganization$.next(organization);
      });
  }

  ngOnInit() {
    this.openOrganization$.next(1);
  }

  get organizations$() {
    return this.organizationService.getOrganizations();
  }

  openOrganizationCard(organizationId: number) {
    this.openOrganization$.next(organizationId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
