import {Component, OnInit} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {map, Subject, switchMap, takeUntil, withLatestFrom} from "rxjs";
import {MenuItem} from "primeng/api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SpaceService} from "../../../../services/space.service";
import {CategoryService} from "../../../../services/category.service";
import {Knowledge} from "../../../../entities/knowledge.model";
import {MarkdownComponent} from "ngx-markdown";
import {RatingModule, RatingRateEvent} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {AuthService} from "../../../../services/auth.service";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";

@Component({
  selector: 'owl-knowledge-page',
  standalone: true,
  imports: [
    BreadcrumbModule,
    MarkdownComponent,
    RatingModule,
    FormsModule,
    DecimalPipe,
    ButtonModule,
    CardModule,
    PdfJsViewerModule
  ],
  templateUrl: './knowledge-page.component.html',
  styleUrl: './knowledge-page.component.scss'
})
export class KnowledgePageComponent implements OnInit {
  private destroy$ = new Subject<void>();

  knowledge: Knowledge | undefined;

  breadcrumbMenuItems: MenuItem[] | undefined;
  home: MenuItem = {icon: 'pi pi-home', routerLink: '../../'};

  knowledgeRating: number | undefined;
  userRating: number | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly spaceService: SpaceService,
    private readonly categoryService: CategoryService,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params: ParamMap) => {
          return this.spaceService.getKnowledgeById(Number(params.get('id')));
        }),
        switchMap(v => {
          return this.spaceService.getKnowledgeRating(v.treeNode.id)
            .pipe(
              map(rating => {
                console.log('onInit:', rating)
                let averageRating = 0;
                let userRating = 0;

                if (rating) {
                  averageRating = rating.userRating.reduce(
                    (acc: number, cv: any) => {
                      return acc + cv.rating;
                    },
                    0
                  ) / rating.userRating.length;

                  userRating = rating.userRating.find((rating: any) => {
                    return this.authService.currentUser$.value!.id === rating.userId;
                  }).rating;
                }

                return {
                  ...v,
                  averageRating: averageRating,
                  userRating: userRating
                }
              })
            )
        })
      )
      .subscribe((v) => {
        const {treeNode, path, averageRating, userRating} = v;
        console.log(treeNode)

        this.breadcrumbMenuItems = path.map(path => {
          return {
            label: path.name,
            routerLink: ['../../directory/' + path.id]
          }
        });
        this.breadcrumbMenuItems.push({
          label: treeNode.name
        });

        this.knowledge = treeNode;

        this.knowledgeRating = averageRating;

        this.userRating = userRating;

        console.log(this.knowledge)
      });
  }

  get formatType() {
    if (this.knowledge && this.knowledge.format && this.knowledge.format.type) {
      return this.knowledge!.format.type;
    } else {
      return ''
    }
  }

  get pdfSrc() {
    let result = null;
    if (this.knowledge && this.formatType === 'pdf') {
      console.log('pdfSrc:', this.knowledge.content)
      result = (this.knowledge.content as any);
      result.url = result.objectURL;
    }

    return result;
    // return 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }

  get imageSrc() {
    if (this.knowledge && this.formatType === 'image') {
      console.log('imageSrc:', this.knowledge.content)
      return (this.knowledge.content as any).objectURL;
    } else {
      return ''
    }
  }

  onRate($event: RatingRateEvent) {
    console.log('onRate', $event);
    this.spaceService.setUserRate(
      this.knowledge!.id,
      this.authService.currentUser$.value!.id,
      $event.value
    )
      .subscribe(v => {
        console.log(v);
      })
  }
}
