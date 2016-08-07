(function () {
  'use strict';

  const app = angular.module('blueitApp');

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/home.html',
        controller: 'postsCtrl',
        controllerAs: 'postsCtrl'
      })
      .when('/login', {
        templateUrl: '../views/login.html',
        controller: 'authCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/register', {
        templateUrl: '../views/register.html',
        controller: 'usersCtrl',
        controllerAs: 'usersCtrl'
      });
  });
}());
