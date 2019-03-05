import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { BookingComponent } from './rental-details/booking.component';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

import { RentalService } from './shared/rental.service';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      {
        path: ':id',
        component: RentalDetailsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailsComponent,
    UppercasePipe,
    BookingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker
  ],
  providers: [RentalService],
  exports: [RouterModule]
})
export class RentalModule {}
