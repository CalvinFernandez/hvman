'use strict';

angular.module('angularApp', ['infinite-scroll', 'restangular', 'http-auth-interceptor', 'ngCookies', 'assert', 'restangularSpinner'])
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
      .when('/posts/:id/edit', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeCtrl'
      })
      .when('/posts/:id', {
        templateUrl: 'views/PostsShow.html',
        controller: 'PostsshowCtrl'
      })
      .when('/compose', {
        controller: 'ComposeCtrl',
        templateUrl: 'views/compose.html'
      })
      .when('/drive', {
        controller: 'DriveCtrl',
        templateUrl: 'views/drive.html'
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
