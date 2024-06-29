import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassNewComponent } from './class-new.component';

describe('ClassNewComponent', () => {
  let component: ClassNewComponent;
  let fixture: ComponentFixture<ClassNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
