const Rental = require('./models/rental');

class FakeDb {
  constructor() {
    this.rentals = [
      {
        title: 'Nice view on the center',
        city: 'Sofia',
        street: 'Ivaylo 25',
        category: 'apartment',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        bedrooms: 2,
        shared: true,
        description: 'Very nice apartment in center of the city.',
        dailyRate: 43
      },
      {
        title: 'Modern apartment in center',
        city: 'New York',
        street: 'Time Square',
        category: 'apartment',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        bedrooms: 1,
        shared: false,
        description: 'Very nice apartment in center of the city.',
        dailyRate: 11
      },
      {
        title: 'Old house in nature',
        city: 'Bansko',
        street: 'Turist 2',
        category: 'house',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        bedrooms: 5,
        shared: true,
        description: 'Very nice apartment in center of the city.',
        dailyRate: 23
      }
    ];
  }

  async cleanDb() {
    await Rental.deleteMany({});
  }

  pushRentalsToDb() {
    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);

      newRental.save();
    });
  }

  seedDb() {
    this.cleanDb();
    this.pushRentalsToDb();
  }
}

module.exports = FakeDb;
