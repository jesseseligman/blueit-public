(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('topicsSvc', topicsSvc);
  app.factory('postsSvc', postsSvc);
  app.factory('usersSvc', usersSvc);
  app.factory('auth', auth);

  topicsSvc.$inject = ['$http'];
  postsSvc.$inject = ['$http'];
  usersSvc.$inject = ['$http'];
  auth.$inject = ['$http'];

  function postsSvc($http) {
    return {
      submitTopic: (newTopic) => {
        return $http.post('/api/topics', {
          name: newTopic
        })
        .then((res) => {
          return res.data.id;
        })
        .catch((err) => {
          throw err;
        })
      },
      submitPost: (topicId, newPost) => {
        newPost.topicId = topicId;
        newPost.rating = 0;

        return $http.post('/api/posts', newPost);
      },
      getPosts: () => {
        return $http.get('/api/posts')
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          })
      }
    }
  };

  function topicsSvc($http) {
    return {
      getTopics: () => {
        return $http.get('/api/topics')
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  };

  function usersSvc($http) {
    return {
      postUser: (user) => {
        return $http.post('/api/users', user)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    }
  }

  function auth($http) {
    return {
      login: (username, password) => {
        return $http.post('/api/token', { username, password })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
      logout: () => {
        return $http.delete('/api/token')
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
        }
    };

  }


})();
