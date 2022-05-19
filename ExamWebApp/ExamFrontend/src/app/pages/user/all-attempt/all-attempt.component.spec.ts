import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttemptComponent } from './all-attempt.component';

describe('AllAttemptComponent', () => {
  let component: AllAttemptComponent;
  let fixture: ComponentFixture<AllAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAttemptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
