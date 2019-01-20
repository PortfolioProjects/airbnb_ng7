import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';

import { RentalService } from './shared/rental.service';
import { RentalDetailsComponent } from './rental-details/rental-details.component';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':id', component: RentalDetailsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailsComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [RentalService],
  exports: [RouterModule]
})
export class RentalModule {}
