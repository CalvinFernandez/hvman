'use strict';

angular.module('angularApp', ['infinite-scroll', 'restangular', 'ui.bootstrap.typeahead','http-auth-interceptor', 'template/typeahead/typeahead.html', 'ui.tinymce', 'ngCookies', 'assert'])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/postsindex.html',
        controller: 'PostsindexCtrl'
      })
      .when('/users', { 
        controller: 'UsersIndexCtrl', 
        templateUrl: 'views/users/users-index.html'
      })
      .when('/users/:id', { 
        controller: 'UsersShowCtrl', 
        templateUrl: 'views/users/users-show.html' 
      })
      .when('posts', {
        templateUrl: 'views/postsindex.html',
        controller: 'PostsindexCtrl'
      })
      .when('/posts/:id', {
        templateUrl: 'views/PostsShow.html',
        controller: 'PostsshowCtrl'
      })
      .when('/newPost', {
        templateUrl: 'views/NewPost.html',
        controller: 'NewpostCtrl'
      })
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html'
      })
      .when('/logout', {
        controller: 'LogoutCtrl',
        templateUrl: 'views/logout.html'
      })
      .when('/about', {
        controller: 'AboutCtrl',
        templateUrl: 'views/about.html'
      })
      .when('/topics', {
        templateUrl: 'views/TopicsIndex.html',
        controller: 'TopicsCtrl'
      })
      .when('/topics/:title', {
        templateUrl: 'views/TopicsShow.html',
        controller: 'TopicsShowCtrl'
      })
      .when('/:tag', {
        templateUrl: 'views/postsindex.html',
        controller: 'TagCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    RestangularProvider.setBaseUrl('/api'); 
  });
