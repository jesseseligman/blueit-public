(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.factory('usersSvc', usersSvc);

  usersSvc.$inject = ['$http'];

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
    };
  };
})();
