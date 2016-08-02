(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('topicsCtrl', topicsCtrl)

  topicsCtrl.$inject = ['$routeParams', 'topicsSvc']

  function topicsCtrl($routeParams, topicsSvc) {
    this.topics = [];

    const activate = () => {

      topicsSvc.getTopics()
        .then((topics) => {
          topics.unshift({ id: 'All', name: 'All'});
          this.topics = topics;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();

    this.formatField = () => {
      if (this.postTopic !== 'Create New') {
        this.newTopic = '';
      }
    };

    this.selected = 'All';

    this.postTopic = 'Create New';

    this.newTopic = '';

    this.isSelected = (id) => id === Number.parseInt(this.selected) || this.selected === 'All';


  };

  app.controller('postsCtrl', postsCtrl)

  postsCtrl.$inject = ['$http', '$routeParams'];

  function postsCtrl($http, $routeParams) {
    this.sortBy = '-rating';

    this.upVote = (post) => {
      post.rating += 1;
    };

    this.downVote = (post) => {
      post.rating -= 1;
    };

    this.submitPost = function(postTopic, newTopic) {
      if (postTopic === 'Create New') {
        console.log(newTopic);
        $http.post('/api/topics', {
          name: newTopic
        })
          .then((topic) => {

            this.newPost.topicId = topic.data.id;
            this.newPost.userId = 1;
            this.newPost.rating = 0;

            return $http.post('/api/posts', this.newPost);
          })
          .then((post) => {
            this.newPost = {};
            activate();
          })
          .catch((err) => {
            throw err;
          })
      }
      else {
        this.newPost.topicId = postTopic;
        this.newPost.userId = 1;
        this.newPost.rating = 0;
        console.log(this.newPost);
        $http.post('/api/posts', this.newPost)
          .then((post) => {
            this.newPost = {};
            activate();
          })
          .catch((err) => {
            throw err;
          });
      };
    };

    this.newPost = {};

    const activate = () => {
      $http.get('/api/posts')
        .then((posts) => {
          this.posts = posts.data;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
    this.posts = [];

  };

})();
