(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('postsCtrl', postsCtrl);

  postsCtrl.$inject = ['postsSvc', 'topicsSvc', '$scope'];

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

    this.isSelected = (id) => id === Number.parseInt(this.selectedTopic) ||
    this.selectedTopic === 'All';

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

    // Code for materialize toast mesages
    this.validationToasts = () => {
      const form = this.postForm;

      if (form.topicName.$invalid) {
        Materialize.toast('Topic name is requred and must be at least 3 characters.', 2500);
      }
      else if (form.title.$invalid) {
        Materialize.toast('Title is required and must be at least 3 characters.', 2500);
      }
      else if (form.imageUrl.$invalid) {
        Materialize.toast('Image URL is required and must be a valid URL.', 2500);
      }
      else if (form.description.$invalid) {
        Materialize.toast('Desciption is required and must be between 3 and 60 characters.', 2500);
      }
    };

    this.submitPost = function() {
      if (this.postForm.$invalid) {
        return this.validationToasts();
      }
      if (this.postTopic === 'Create New') {
        postsSvc.submitTopic(this.newTopic)
          .then((topicId) => {
            return postsSvc.submitPost(topicId, this.newPost)
          })
          .then((_res) => {
            this.submitActions();
          })
          .catch((err) => {
            throw err;
          });
      }
      else {
        return postsSvc.submitPost(this.postTopic, this.newPost)
          .then((_res) => {
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
