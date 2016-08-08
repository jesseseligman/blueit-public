(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.directive('biPostModal', function() {
    return {
      templateUrl: '../views/modal.html'
    }
  })
})();
