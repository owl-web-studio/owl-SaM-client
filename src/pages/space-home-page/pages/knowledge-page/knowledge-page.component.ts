import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {map, Subject, switchMap, takeUntil, withLatestFrom} from "rxjs";
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SpaceService} from "../../../../services/space.service";
import {CategoryService} from "../../../../services/category.service";
import {Knowledge} from "../../../../entities/knowledge.model";
import {MarkdownComponent} from "ngx-markdown";
import {RatingModule, RatingRateEvent} from "primeng/rating";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {AuthService} from "../../../../services/auth.service";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {KnowledgeComment} from "../../../../entities/knowledge-comment.model";
import {AvatarModule} from "primeng/avatar";

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
    PdfJsViewerModule,
    ReactiveFormsModule,
    AvatarModule
  ],
  templateUrl: './knowledge-page.component.html',
  styleUrl: './knowledge-page.component.scss'
})
export class KnowledgePageComponent implements OnInit, AfterViewInit {
  private destroy$ = new Subject<void>();

  knowledge: Knowledge | undefined;

  // 3d model
  @ViewChild('rendererContainer', {static: true}) rendererContainer!: ElementRef;
  public loader: GLTFLoader | undefined;
  public scene: Scene | undefined;
  public camera: PerspectiveCamera | undefined;
  public controls: OrbitControls | undefined;
  public renderer: WebGLRenderer | undefined;

  // Navigation
  breadcrumbMenuItems: MenuItem[] | undefined;
  home: MenuItem = {icon: 'pi pi-home', routerLink: '../../'};

  // Rating
  knowledgeRating: number | undefined;
  userRating: number | undefined;

  // Comments
  comments: KnowledgeComment[] | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly spaceService: SpaceService,
    private readonly categoryService: CategoryService,
    private readonly authService: AuthService
  ) {
    this.loader = new GLTFLoader();
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
        }),
        switchMap(v => {
          return this.spaceService.getKnowledgeComments(v.treeNode.id)
            .pipe(
              map((comments) => {
                console.log(comments.comments)

                return {
                  ...v,
                  comments: comments.comments as KnowledgeComment[]
                }
              })
            )
        })
      )
      .subscribe((v) => {
        const {
          treeNode,
          path,
          averageRating,
          userRating,
          comments
        } = v;
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
        this.comments = comments;

        console.log(this.knowledge)
      });
  }

  ngAfterViewInit() {
    if (this.formatType === '3d') {
      this.load3dModel();
    }
  }

  load3dModel() {
    this.scene = new Scene();
    this.scene.background = new Color(0xffffff);

    this.camera = new PerspectiveCamera(75, (window.innerWidth  * 0.7) / (window.innerHeight * 0.8), 0.1, 1000);
    this.camera.position.set(-1.8, 0.6, 5);

    this.renderer = new WebGLRenderer({antialias: true});
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.8);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera!, this.renderer.domElement);
    this.controls.addEventListener('change', () => {
      this.renderer!.render(this.scene!, this.camera!);
    });
    this.controls.enableZoom = true
    this.controls.update();

    console.log('3d model URL: ',  this.knowledge)
    console.log('3d model URL: ',  this.knowledge!.content)
    console.log('3d model URL: ',  (this.knowledge!.content as any).objectURL)

    this.loader!.load(
      (this.knowledge!.content as any).objectURL,
      // '/assets/3d/car.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 1, 0);
        this.scene!.add(model);

        const ambientLight = new AmbientLight(0xffffff);
        this.scene!.add(ambientLight);


      },
      undefined,
      (error) => {
        console.error('Error loading GLTF:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Возникла ошибка при загрузке модели!'
        })
      }
    )
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
