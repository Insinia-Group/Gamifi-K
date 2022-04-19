import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodRendererComponent } from './mood-renderer.component';

describe('MoodRendererComponent', () => {
  let component: MoodRendererComponent;
  let fixture: ComponentFixture<MoodRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
