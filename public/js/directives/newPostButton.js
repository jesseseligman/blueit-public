(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.directive('newPostButton', function () {
  return {
    templateUrl: 'newPostButton.html',
    scope: {
      yoyoInDirective: '=yoyoAttribute'
    }
  };
}());
