import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTwoComponent } from './success-two.component';

describe('SuccessTwoComponent', () => {
  let component: SuccessTwoComponent;
  let fixture: ComponentFixture<SuccessTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
