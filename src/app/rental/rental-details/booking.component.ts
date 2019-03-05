import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'trc-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @Input() price: number;
  daterange: any = {};

  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left'
  };

  constructor() {}

  ngOnInit() {}

  selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
