import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRankingDevComponent } from './user-ranking-dev.component';

describe('UserRankingDevComponent', () => {
  let component: UserRankingDevComponent;
  let fixture: ComponentFixture<UserRankingDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRankingDevComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRankingDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
