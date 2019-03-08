const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users-controller');
const bookingsController = require('../controllers/bookings-controller');

router.post(
  '',
  usersController.authMiddleware,
  bookingsController.createBooking
);

module.exports = router;
