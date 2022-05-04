import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorErrorComponent } from './validator-error.component';

describe('ValidatorErrorComponent', () => {
  let component: ValidatorErrorComponent;
  let fixture: ComponentFixture<ValidatorErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
