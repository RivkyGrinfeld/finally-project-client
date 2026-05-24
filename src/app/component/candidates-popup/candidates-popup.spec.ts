import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesPopupComponent } from './candidates-popup';

describe('CandidatesPopupComponent', () => {
  let component: CandidatesPopupComponent;
  let fixture: ComponentFixture<CandidatesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
