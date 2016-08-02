(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('topicsSvc', topicsSvc);
  app.factory('postsSvc', postsSvc);

  topicsSvc.$inject = ['$http'];
  postsSvc.$inject = ['$http'];

  function postsSvc($http) {

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
      },

    }
  };


})();
