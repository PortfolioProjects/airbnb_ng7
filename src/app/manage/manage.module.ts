import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { ManageComponent } from './manage.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageRentalBookingsComponent } from './manage-rental/manage-rental-bookings.component';
import { FormatDatePipe } from '../common/pipes/format-date.pipe';

import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      {
        path: 'rentals',
        component: ManageRentalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'bookings',
        component: ManageBookingComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    ManageComponent,
    ManageBookingComponent,
    ManageRentalComponent,
    ManageRentalBookingsComponent,
    FormatDatePipe
  ],
  imports: [CommonModule, NgPipesModule, RouterModule.forChild(routes)],
  providers: [RentalService, BookingService, AuthGuard],
  exports: [RouterModule]
})
export class ManageModule {}
