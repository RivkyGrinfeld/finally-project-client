import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedCandidatesPopup } from './approved-candidates-popup';

describe('ApprovedCandidatesPopup', () => {
  let component: ApprovedCandidatesPopup;
  let fixture: ComponentFixture<ApprovedCandidatesPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedCandidatesPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedCandidatesPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
