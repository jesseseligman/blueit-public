'use strict';

const express = require('express');
const router = express.Router();

const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/topics');
const knex = require('../knex');

router.get('/api/topics', (_req, res, next) => {
  knex('topics')
    .orderBy('name')
    .then((rows) => {
      const topics = camelizeKeys(rows);

      res.send(topics);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/topics', ev(validations.post), (req, res, next) => {
  const newPost = decamelizeKeys(req.body);

  knex('topics')
    .insert(newPost, '*')
    .then((rows) => {
      const post = camelizeKeys(rows[0]);
      
      res.send(post);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
