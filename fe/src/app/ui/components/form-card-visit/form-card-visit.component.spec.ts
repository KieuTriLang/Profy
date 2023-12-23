import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCardVisitComponent } from './form-card-visit.component';

describe('FormCardVisitComponent', () => {
  let component: FormCardVisitComponent;
  let fixture: ComponentFixture<FormCardVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCardVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCardVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
