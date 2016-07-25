'use strict';

const express = require('express');
const port = process.env.PORT || 8000;
const path = require('path');

const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');

const users = require('./routes/users');
const topics = require('./routes/topics');
const posts = require('./routes/posts');

const app = express();

app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'test') {
  const morgan = require('morgan');
  app.use(morgan('short'));
}

app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(cookieSession({
//   name: 'blueit',
//   secret: process.env.SESSION_SECRET
// }));

// app.use(users);
app.use(topics);
// app.use(posts);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status || err.statusCode) {
    return res.status(err.status || err.statusCode).send(err);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
