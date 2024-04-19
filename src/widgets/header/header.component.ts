import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TooltipModule} from "primeng/tooltip";
import {DividerModule} from "primeng/divider";
import {BreadcrumbService} from "../../services/breadcrumb.service";
import {BehaviorSubject, debounceTime, Subject, switchMap, takeUntil, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {BadgeModule} from "primeng/badge";


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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  title$: BehaviorSubject<string>;
  searchBarValue = '';
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300;
  showSearchResult$ = new BehaviorSubject<boolean>(false);
  searchResult$ = new BehaviorSubject<any[]>([])

  accountMenuItems: MenuItem[] = [
    {
      label: 'Личный кабинет',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/profile']);
      }
    },
    {
      label: 'Настройки',
      icon: 'pi pi-cog',
      command: () => {
        this.router.navigate(['/settings']);
      },
    },
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

  constructor(
    private readonly router: Router,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly authService: AuthService,
    private readonly searchService: SearchService
  ) {
    this.title$ = breadcrumbService.title$;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.searchSubject
      .pipe(
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
          return this.searchService.search(searchValue);
        })
      )
      .subscribe(result => {
        this.searchResult$.next(result);
      })
  }

  get currentUser$() {
    return this.authService.currentUser$;
  }

  onSearch() {
    this.searchSubject.next(this.searchBarValue);
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
