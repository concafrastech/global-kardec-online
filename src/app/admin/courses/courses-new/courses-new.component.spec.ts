import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesNewComponent } from './courses-new.component';

describe('CoursesNewComponent', () => {
  let component: CoursesNewComponent;
  let fixture: ComponentFixture<CoursesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
