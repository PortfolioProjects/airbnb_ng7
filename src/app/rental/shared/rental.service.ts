import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {
  private rentals: Rental[] = [
    {
      id: '1',
      title: 'Some nice apartment',
      city: 'New York',
      street: 'Times Square',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Awesome apartment',
      dailyRate: 34,
      shared: false,
      createdAt: '20/12/2018'
    },
    {
      id: '2',
      title: 'Central apartment',
      city: 'New York',
      street: '7th Ave',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Awesome apartment',
      dailyRate: 50,
      shared: false,
      createdAt: '10/12/2018'
    },
    {
      id: '3',
      title: 'Central apartment',
      city: 'London',
      street: 'Baker Street',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 2,
      description: 'Awesome apartment',
      dailyRate: 40,
      shared: false,
      createdAt: '15/12/2018'
    },
    {
      id: '4',
      title: 'Some nice apartment',
      city: 'New York',
      street: 'Times Square',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Awesome apartment',
      dailyRate: 34,
      shared: false,
      createdAt: '20/12/2018'
    },
    {
      id: '5',
      title: 'Some nice apartment',
      city: 'New York',
      street: 'Times Square',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Awesome apartment',
      dailyRate: 34,
      shared: false,
      createdAt: '20/12/2018'
    },
    {
      id: '6',
      title: 'Some nice apartment',
      city: 'New York',
      street: 'Times Square',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Awesome apartment',
      dailyRate: 34,
      shared: false,
      createdAt: '20/12/2018'
    },
    {
      id: '7',
      title: 'Some nice apartment',
      city: 'New York',
      street: 'Times Square',
      category: 'apartment',
      image: 'http://via.placeholder.com/350x250',
      bedrooms: 3,
      description: 'Awesome apartment',
      dailyRate: 34,
      shared: false,
      createdAt: '20/12/2018'
    }
  ];

  getRentalById(id: string): Observable<Rental> {
    return new Observable<Rental>(observer => {
      setTimeout(() => {
        const foundRental = this.rentals.find(rental => {
          return rental.id === id;
        });

        observer.next(foundRental);
      }, 500);
    });
  }

  getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>(observer => {
      setTimeout(() => {
        observer.next(this.rentals);
      }, 1000);
    });
  }
}
