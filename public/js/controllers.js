(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('topicsCtrl', topicsCtrl);
  app.controller('postsCtrl', postsCtrl);
  app.controller('usersCtrl', usersCtrl);
  app.controller('authCtrl', authCtrl);

  topicsCtrl.$inject = ['$routeParams', 'topicsSvc'];
  postsCtrl.$inject = ['$routeParams', 'postsSvc'];
  usersCtrl.$inject = ['$routeParams', 'usersSvc'];
  authCtrl.$inject = ['auth', '$location', '$cookies'];

  function topicsCtrl($routeParams, topicsSvc) {
    this.topics = [];
    this.selected = 'All';
    this.postTopic = 'Create New';
    this.newTopic = '';

    this.activate = () => {
      topicsSvc.getTopics()
        .then((topics) => {
          topics.unshift({ id: 'All', name: 'All'});
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

  function postsCtrl( $routeParams, postsSvc) {
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

  function usersCtrl($routeParams, usersSvc) {
    this.user = {};

    this.addUser = () => {
      usersSvc.postUser(this.user)
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          throw err;
        });
    }
  }

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
    }
  }
})();
