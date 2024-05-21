import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Subject, switchMap, takeUntil} from "rxjs";
import {User} from "../../../entities/user.model";

@Component({
  selector: 'owl-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  user: User | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService
  ) {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.userService.getUserInfo(Number(params.get('id')));
        }),
      )
      .subscribe(user => {
        this.user = user;
      })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
