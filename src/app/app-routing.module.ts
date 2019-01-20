import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RentalModule } from './rental/rental.module';

const routes: Routes = [
  { path: '', redirectTo: '/rentals', pathMatch: 'full' },
  { path: 'rentals', loadChildren: './rental/rental.module#RentalModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
