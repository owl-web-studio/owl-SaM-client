import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {SpaceService} from "../../services/space.service";
import {Subject, switchMap, takeUntil} from "rxjs";
import {Space} from "../../entities/space.model";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'owl-space-home-page',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    TooltipModule
  ],
  templateUrl: './space-home-page.component.html',
  styleUrl: './space-home-page.component.scss'
})
export class SpaceHomePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  space: Space | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService,
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
      .subscribe((space: Space) => {
        this.space = space;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
