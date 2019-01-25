const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');

// const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals'),
  userRoutes = require('./routes/users');

mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true }
);
// .then(() => {
//   const fakeDb = new FakeDb();
//   fakeDb.seedDb();
// });
mongoose.set('useCreateIndex', true);

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(config.PORT, function() {
  console.log(`Server is running at port ${config.PORT}`);
});
