import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {SpaceService} from "../../services/space.service";
import {Subject, switchMap, takeUntil} from "rxjs";
import {Space} from "../../entities/space.model";

@Component({
  selector: 'owl-space-info-page',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule
  ],
  templateUrl: './space-info-page.component.html',
  styleUrl: './space-info-page.component.scss'
})
export class SpaceInfoPageComponent implements OnInit, OnDestroy {
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
