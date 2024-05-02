import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNewComponent } from './calendar-new.component';

describe('CalendarNewComponent', () => {
  let component: CalendarNewComponent;
  let fixture: ComponentFixture<CalendarNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
