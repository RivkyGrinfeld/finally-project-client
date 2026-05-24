import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmedPosts } from './unconfirmed-posts';

describe('UnconfirmedPosts', () => {
  let component: UnconfirmedPosts;
  let fixture: ComponentFixture<UnconfirmedPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnconfirmedPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnconfirmedPosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
