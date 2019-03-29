import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Booking } from '../../booking/shared/booking.model';

@Component({
  selector: 'trc-manage-rental-bookings',
  templateUrl: './manage-rental-bookings.component.html',
  styleUrls: ['./manage-rental-bookings.component.scss']
})
export class ManageRentalBookingsComponent implements OnInit {
  @Input() bookings: Booking[];

  constructor(public modalService: NgbModal) {}

  ngOnInit() {}
}
