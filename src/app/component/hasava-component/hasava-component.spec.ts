import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasavaComponent } from './hasava-component';

describe('HasavaComponent', () => {
  let component: HasavaComponent;
  let fixture: ComponentFixture<HasavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HasavaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HasavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
