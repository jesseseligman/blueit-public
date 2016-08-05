(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('topicsSvc', topicsSvc);

  topicsSvc.$inject = ['$http'];

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
    };
  };
})();
