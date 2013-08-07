'use strict';

angular.module('angularApp')
  .controller('PostsCtrl', function ($scope, $http) {
    $scope.chomp = function(text) {
      return text.substring(0, 300) + " ..."; 
    }

    $scope.filterHTML = function(text) {
      return text.replace(/\<.+?>|\&.+?;/g, ""); // Filter out html 
    }

    $scope.voteUp = function(post) {
      post.voted_for = !post.voted_for; 
      post.voted_against = false;

      $http({
        url: '/api/posts/'+ post.id + '/vote', 
        method: 'POST',
        data: {"vote": true}
      });
    }

    $scope.voteDown = function(post) {
      post.voted_against = !post.voted_against;
      post.voted_for = false;

      $http({
        url: '/api/posts/'+ post.id + '/vote', 
        method: 'POST',
        data: {"vote": false}
      });
    }
  });
