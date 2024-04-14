import {Component, OnDestroy} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ToolbarComponent} from "../../widgets/toolbar/toolbar.component";
import {RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {BehaviorSubject, Subject, switchMap, takeUntil} from "rxjs";
import {Space} from "../../entities/space.model";

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
export class HomePageComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  title = 'owl-SaM';

  openedSpace$ = new BehaviorSubject<undefined | Space>(undefined);
  openSpace$ = new Subject<number>();

  constructor(
    private readonly spaceService: SpaceService,
  ) {
    this.openSpace$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((spaceId: number) => {
          return this.spaceService.getSpaceInfo(spaceId);
        })
      )
      .subscribe(space => {
        this.openedSpace$.next(space);
      });
  }

  get spaces$() {
    return this.spaceService.getSpaces();
  }

  openSpaceCard(spaceId: number) {
    this.openSpace$.next(spaceId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
