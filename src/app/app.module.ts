import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    RentalModule,
    AuthModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
