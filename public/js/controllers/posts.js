(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('postsCtrl', postsCtrl);

  postsCtrl.$inject = ['postsSvc', 'topicsSvc'];

  function postsCtrl(postsSvc, topicsSvc) {
    // Variables for topics
    this.topics = [];
    this.selectedTopic = 'All';
    this.postTopic = 'Create New';
    this.newTopic = '';

    this.formatField = () => {
      if (this.postTopic !== 'Create New') {
        this.newTopic = '';
      }
    };

    this.isSelected = (id) => id === Number.parseInt(this.selectedTopic) || this.selectedTopic === 'All';

    // Variables for posts
    this.sortBy = '-rating';
    this.newPost = {};
    this.posts = [];

    this.upVote = (post) => {
      post.rating += 1;
    };

    this.downVote = (post) => {
      post.rating -= 1;
    };

    this.submitPost = function() {
      if (this.postForm.$invalid) {
        return console.log('invalid');
      }
      if (this.postTopic === 'Create New') {
        postsSvc.submitTopic(this.newTopic)
          .then((topicId) => {
            return postsSvc.submitPost(topicId, this.newPost)
          })
          .then((res) => {
            this.submitActions();
          })
          .catch((err) => {
            throw err;
          });
      }
      else {
        return postsSvc.submitPost(this.postTopic, this.newPost)
          .then((res) => {
            this.submitActions();
          })
          .catch((err) => {
            throw err;
          });
      }
    };

    // Function to be called after form submissions to reset variables
    this.submitActions = () => {
      this.newPost = {};
      this.newTopic = '';
      this.postTopic = 'Create New';
      this.selectedTopic = 'All';
      this.postForm.$setPristine();
      $('#post-modal').closeModal();
      this.formatField();
      activate();
    };

    const activate = () => {
      postsSvc.getPosts()
        .then((posts) => {
          this.posts = posts;
        })
        .catch((err) => {
          throw err;
        });
      topicsSvc.getTopics()
        .then((topics) => {
          this.topics = topics;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  };

})();
