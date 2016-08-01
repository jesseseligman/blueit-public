(function() {
  'use strict';

  $(".button-collapse").sideNav();
  $('select').material_select();
  $(document).ready(function(){
    $('.modal-trigger').leanModal();
  });
  const app = angular.module('blueitApp', ['ui.materialize']);
})();
