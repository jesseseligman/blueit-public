'use strict';


const express = require('express');
const router = express.Router();

const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/posts');
const knex = require('../knex');

router.get('/posts', (req, res, next) => {
  knex('posts')
    .orderBy('title')
    .then((rows) => {
      const posts = camelizeKeys(rows);

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/posts/:topicId', (req, res, next) => {
  const topicId = Number.parseInt(req.params.topicId);

  if (Number.isNaN(topicId)) {
    return next();
  }

  knex('posts')
    .where('topic_id', topicId)
    .then((rows) => {
      if (rows.length === 0) {
        throw boom.notFound('Not found');
      }

      const posts = camelizeKeys(rows);

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/posts', ev(validations.post), (req, res, next) => {
  const { title, imageUrl, description, rating, topicId, userId } = req.body;

  const row = decamelizeKeys({ title, imageUrl, description, rating, topicId, userId });

  knex('posts')
    .insert(row, '*')
    .then((rows) => {
      const post = camelizeKeys(rows[0]);

      res.send(post);
    })
    .catch((err) => {
      next(boom.wrap(err));
    });
});

module.exports = router;
