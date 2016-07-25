'use strict';

const express = require('express');
const router = express.Router();

const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/topics');
const knex = require('../knex');

router.get('/topics', (_req, res, next) => {
  knex('topics')
    .orderBy('id')
    .then((topics) => {
      res.send(topics);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/topics', ev(validations.post), (req, res, next) => {
  const newPost = req.body;

  knex('topics')
    .insert(newPost, '*')
    .then((topics) => {
      res.send(topics[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
