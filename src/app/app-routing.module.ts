import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/rentals', pathMatch: 'full' },
  { path: 'rentals', loadChildren: './rental/rental.module#RentalModule' },
  { path: 'manage', loadChildren: './manage/manage.module#ManageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
