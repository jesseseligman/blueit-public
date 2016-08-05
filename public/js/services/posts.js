(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('postsSvc', postsSvc);
  
  postsSvc.$inject = ['$http'];

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
})();
