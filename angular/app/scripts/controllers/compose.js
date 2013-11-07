'use strict';

angular.module('angularApp')
  .controller('ComposeCtrl', function($scope, authService, Session, assertService) {

    $scope.post = {};
    $scope.post.title = 'Untitled';

    $scope.save = function(data) {
      $scope.post.content = data;
      console.log(data);  
    }

    $scope.post.topics = [];

    $scope.addToTopics = function(topic) {
      console.log(topic);
    }

  }); 
