import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleFormsComponent } from './people-forms.component';

describe('PeopleFormsComponent', () => {
  let component: PeopleFormsComponent;
  let fixture: ComponentFixture<PeopleFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
