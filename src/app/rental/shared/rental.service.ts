import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {
  constructor(private http: HttpClient) {}

  getRentalById(id: string): Observable<any> {
    return this.http.get('/api/v1/rentals/' + id);
  }

  getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }
}
