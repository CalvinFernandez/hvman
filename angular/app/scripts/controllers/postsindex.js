'use strict';

angular.module('angularApp')
  .controller('PostsindexCtrl', function ($scope, Restangular) {
    $scope.posts = [];
    $scope.busy = false;
    $scope.page = 1;

    $scope.nextPage = function() {
      if ($scope.busy) return;
      $scope.busy = true;

      Restangular.all('posts').getList({page: $scope.page}).then(function(posts) {
        for (var i = 0; i < posts.length; i ++) {
          $scope.posts.push(posts[i]);
        }
        $scope.page += 1;
        $scope.busy = false;
      }); 
    }
  });
