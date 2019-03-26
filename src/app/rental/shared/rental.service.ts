import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {
  constructor(private http: HttpClient) {}

  getRentalById(id: string): Observable<any> {
    return this.http.get('/api/v1/rentals/' + id);
  }

  getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }

  getRentalsByCity(city: string): Observable<any> {
    return this.http.get(`/api/v1/rentals?city=${city}`);
  }

  createRental(rental: Rental): Observable<any> {
    return this.http.post('/api/v1/rentals', rental);
  }
}
