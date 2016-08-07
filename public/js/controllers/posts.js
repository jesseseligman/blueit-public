(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('postsCtrl', postsCtrl);

  postsCtrl.$inject = ['postsSvc'];

  function postsCtrl(postsSvc) {
    this.sortBy = '-rating';
    this.newPost = {};
    this.posts = [];

    this.upVote = (post) => {
      post.rating += 1;
    };

    this.downVote = (post) => {
      post.rating -= 1;
    };

    this.submitPost = function(newPost, postTopic, newTopic) {
      if (newPost.$invalid) {
        return console.log('invalid');
      }
      if (postTopic === 'Create New') {
        postsSvc.submitTopic(newTopic)
          .then((topicId) => {
            return postsSvc.submitPost(topicId, this.newPost)
          })
          .then((res) => {
            this.newPost = {};
            this.postForm.$setPristine();
            $('#post-modal').closeModal();
            activate();
          })
          .catch((err) => {
            throw err;
          });
      }
      else {
        return postsSvc.submitPost(postTopic, this.newPost)
          .then((res) => {
            this.newPost = {};
            activate();
          })
          .catch((err) => {
            throw err;
          });
      }
    };

    const activate = () => {
      postsSvc.getPosts()
        .then((posts) => {
          this.posts = posts;
        })
        .catch((err) => {
          throw err;
        })
    };

    activate();
  };

})();
