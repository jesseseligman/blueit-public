'use strict';


const express = require('express');
const router = express.Router();

const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/posts');
const knex = require('../knex');
const { checkAuth } = require('../middleware');

router.get('/api/posts', (req, res, next) => {
  knex.from('posts')
    .innerJoin('users', 'users.id', 'posts.user_id')
    .orderBy('title')
    .then((rows) => {
      const posts = camelizeKeys(rows);

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/posts/:topicId', (req, res, next) => {
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

router.post('/api/posts', checkAuth, ev(validations.post), (req, res, next) => {
  const { title, imageUrl, description, rating, topicId } = req.body;

  const userId = req.token.userId;
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
