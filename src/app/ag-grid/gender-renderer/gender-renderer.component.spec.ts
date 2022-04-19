import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderRendererComponent } from './gender-renderer.component';

describe('GenderRendererComponent', () => {
  let component: GenderRendererComponent;
  let fixture: ComponentFixture<GenderRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
