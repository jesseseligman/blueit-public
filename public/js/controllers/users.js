(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('usersCtrl', usersCtrl);

  usersCtrl.$inject = ['usersSvc'];

  function usersCtrl(usersSvc) {
    this.user = {};

    this.addUser = () => {
      usersSvc.postUser(this.user)
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          throw err;
        });
    };
  };

})();
