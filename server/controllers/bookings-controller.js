const moment = require('moment');

const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

let createBooking = (req, res) => {
  const { startAt, endAt, totalPrice, days, guests, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    days,
    guests
  });

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('users')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user == user.id) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid user',
              detail: 'Rental owner cannot create booking on his rental'
            }
          ]
        });
      }

      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = foundRental;
        foundRental.bookings.push(booking);

        booking.save(function(err) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          }

          foundRental.save();
          User.updateOne(
            { _id: user.id },
            { $push: { bookings: booking } },
            function() {}
          );

          return res.json({ startAt: booking.startAt, endAt: booking.endAt });
        });
      } else {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid booking',
              detail: 'Chosen dates are already taken!'
            }
          ]
        });
      }
    });
};

let getUserBookings = (req, res) => {
  const user = res.locals.user;

  Booking.where({ user })
    .populate('rental')
    .exec(function(err, foundBookings) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(foundBookings);
    });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }

  return isValid;
}

module.exports = {
  createBooking,
  getUserBookings
};
