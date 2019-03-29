import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRentalBookingsComponent } from './manage-rental-bookings.component';

describe('ManageRentalBookingsComponent', () => {
  let component: ManageRentalBookingsComponent;
  let fixture: ComponentFixture<ManageRentalBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRentalBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRentalBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
