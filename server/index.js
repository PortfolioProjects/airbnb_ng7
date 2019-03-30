const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals'),
  userRoutes = require('./routes/users'),
  bookingRoutes = require('./routes/bookings');

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(() => {
  if (process.env.NODE_ENV !== 'production') {
    const fakeDb = new FakeDb();
    //   fakeDb.seedDb();
  }
});
mongoose.set('useCreateIndex', true);

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist/airbnb-ng');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

app.listen(config.PORT, function() {
  console.log(`Server is running at port ${config.PORT}`);
});
