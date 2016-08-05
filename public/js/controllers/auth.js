(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('authCtrl', authCtrl);

  authCtrl.$inject = ['auth', '$location', '$cookies'];

  function authCtrl(auth, $location, $cookies) {
    this.username = '';
    this.password = '';
    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    }

    this.loggedInId;

    this.login = () => {
      auth.login(this.username, this.password)
        .then((user) => {
          $location.path('/');
        })
        .catch((err) => {
          alert('Login Failed');
        });
    };

    this.logout = () => {
      auth.logout();
    };
  }

})();
