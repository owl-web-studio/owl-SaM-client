import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceInfoPageComponent } from './space-info-page.component';

describe('OrganizationPageComponent', () => {
  let component: SpaceInfoPageComponent;
  let fixture: ComponentFixture<SpaceInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
