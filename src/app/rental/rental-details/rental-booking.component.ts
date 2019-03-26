import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';

import { Booking } from '../../booking/shared/booking.model';
import { Rental } from '../shared/rental.model';
import { BookingService } from '../../booking/shared/booking.service';
import { HelperService } from '../../common/service/helper.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'trc-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})
export class RentalBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locale: { format: this.helper.BOOKING_DATE },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(
    private helper: HelperService,
    private bookingService: BookingService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookedOutDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success(
          'Booking has been successfully created, check your booking detail in manage section.',
          'Success!'
        );
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  selectedDate(value: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = value.end.diff(value.start, 'days') + 1;
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(
          booking.startAt,
          booking.endAt
        );

        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  private addNewBookedOutDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(
      bookingData.startAt,
      bookingData.endAt
    );

    this.bookedOutDates.push(...dateRange);
  }

  private checkForInvalidDates(date) {
    return (
      this.bookedOutDates.includes(this.helper.formatBookingDate(date)) ||
      date.diff(moment(), 'days') < 0
    );
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }
}
