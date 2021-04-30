import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScollPromotionComponent } from './scoll-promotion.component';

describe('ScollPromotionComponent', () => {
  let component: ScollPromotionComponent;
  let fixture: ComponentFixture<ScollPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScollPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScollPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
