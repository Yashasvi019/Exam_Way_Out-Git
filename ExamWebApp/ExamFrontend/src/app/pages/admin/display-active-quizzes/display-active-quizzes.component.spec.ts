import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayActiveQuizzesComponent } from './display-active-quizzes.component';

describe('DisplayActiveQuizzesComponent', () => {
  let component: DisplayActiveQuizzesComponent;
  let fixture: ComponentFixture<DisplayActiveQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayActiveQuizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayActiveQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
