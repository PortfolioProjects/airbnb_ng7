import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class HelperService {
  readonly BOOKING_DATE = 'YYYY/MM/DD';

  getBookingRangeOfDates(startAt, endAt) {
    return this.getRangeOfDates(startAt, endAt, this.BOOKING_DATE);
  }

  formatBookingDate(date) {
    return this.formatDate(date, this.BOOKING_DATE);
  }

  private getRangeOfDates(startAt, endAt, dateFormat) {
    const tempDates = [];
    const dateEndAt = moment(endAt);
    let dateStartAt = moment(startAt);

    while (dateStartAt <= dateEndAt) {
      tempDates.push(dateStartAt.format(dateFormat));
      dateStartAt = dateStartAt.add(1, 'day');
    }

    return tempDates;
  }

  private formatDate(date, dateFormat) {
    return moment(date).format(dateFormat);
  }
}
