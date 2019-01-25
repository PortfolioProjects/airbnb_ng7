const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

let auth = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [{ title: 'Data missing', detail: 'Provide email and passwors' }]
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (!user) {
      return res.status(422).send({
        errors: [{ title: 'Invalid user', detail: 'User does not exist' }]
      });
    }

    if (user.hasSamePassword(password)) {
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        config.SECRET,
        { expiresIn: '1h' }
      );

      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: 'Wrong data', detail: 'Wrong email or password' }]
      });
    }
  });
};

let register = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        {
          title: 'Data missing',
          detail: 'Provide email and password'
        }
      ]
    });
  }

  if (password !== confirmPassword) {
    return res.status(422).send({
      errors: [
        {
          title: 'Invalid password',
          detail: 'You was not confirm password'
        }
      ]
    });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: 'Invalid email',
            detail: 'User with this email already exists'
          }
        ]
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(err => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json({ registered: true });
    });
  });
};

let authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const userData = parseToken(token);

    User.findById(userData.userId, (err, user) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  // 'Bearer abshriuy3249723p98' -> token's format
  return (decodedToken = jwt.verify(token.split(' ')[1], config.SECRET));
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      { title: 'Not authorized', detail: 'You need to log in to get access' }
    ]
  });
}

module.exports = {
  auth,
  register,
  authMiddleware
};
