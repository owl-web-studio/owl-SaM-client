import {AfterViewInit, Component, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TooltipModule} from "primeng/tooltip";
import {DividerModule} from "primeng/divider";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  delay,
  filter,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timeout
} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ActivatedRoute, ActivationEnd, NavigationStart, ParamMap, Router, RouterLink} from "@angular/router";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {Space} from "../../entities/space.model";


@Component({
  selector: 'owl-header',
  standalone: true,
  imports: [
    TooltipModule,
    DividerModule,
    AsyncPipe,
    RouterLink,
    MenuModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    BadgeModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  title$: BehaviorSubject<string>;
  searchBarValue = '';
  private searchSubject$ = new Subject<string>();
  private readonly debounceTimeMs = 300;
  showSearchResult$ = new BehaviorSubject<boolean>(false);
  searchResult$ = new BehaviorSubject<any[]>([]);
  isLoading: boolean = false;

  currentOrganization: number | undefined;
  currentSpace: number | undefined;
  currentDirectory: number | undefined;
  currentKnowledge: number | undefined;

  accountMenuItems: MenuItem[] = [
    {
      label: 'Личный кабинет',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/profile']);
      }
    },
    // {
    //   label: 'Настройки',
    //   icon: 'pi pi-cog',
    //   command: () => {
    //     this.router.navigate(['/settings']);
    //   },
    // },
    {
      label: 'Выйти из аккаунта',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout().subscribe(() => {
          window.location.reload()
        });
      }
    }
  ];

  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly authService: AuthService,
    private readonly searchService: SearchService
  ) {
    this.title$ = this.breadcrumbService.title$;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.searchSubject$
      .pipe(
        tap(_ => {
          this.searchResult$.next([]);
          this.isLoading = true;
        }),
        takeUntil(this.destroy$),
        debounceTime(this.debounceTimeMs),
        tap(searchValue => {
          if (searchValue.length > 0) {
            this.showSearchResult$.next(true);
          } else {
            this.showSearchResult$.next(false);
          }
        }),
        switchMap(searchValue => {
          return this.searchService.search(searchValue)
        })
      )
      .subscribe(result => {
        console.log('sub res', result)
        this.isLoading = false;
        this.searchResult$.next(result);
      })
  }

  get currentUser$() {
    return this.authService.currentUser$;
  }

  onSearch() {
    this.searchSubject$.next(this.searchBarValue);
  }

  onClickedSearchResult() {
    this.searchBarValue = '';
    this.searchResult$.next([]);
    this.showSearchResult$.next(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
