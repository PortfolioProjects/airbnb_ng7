const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');

mongoose
  .connect(
    config.MONGO_URI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
  });

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

app.listen(config.PORT, function() {
  console.log(`Server is running at port ${config.PORT}`);
});
