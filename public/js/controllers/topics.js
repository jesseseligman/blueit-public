(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('topicsCtrl', topicsCtrl);

  topicsCtrl.$inject = ['topicsSvc'];

  function topicsCtrl(topicsSvc) {
    this.topics = [];
    this.selected = 'All';
    this.postTopic = 'Create New';
    this.newTopic = '';

    this.activate = () => {
      topicsSvc.getTopics()
        .then((topics) => {
          this.topics = topics;
          this.newTopic = '';
        })
        .catch((err) => {
          throw err;
        });
    };

    this.activate();

    this.formatField = () => {
      if (this.postTopic !== 'Create New') {
        this.newTopic = '';
      }
    };

    this.isSelected = (id) => id === Number.parseInt(this.selected) || this.selected === 'All';
  };


})();
