'use strict';

angular.module('angularApp')
  .controller('DriveCtrl', function($scope, authService, Session, assertService, Restangular) {
    var drive = Restangular.all('drive');

    $scope.page = 0;
    $scope.selected = '';
    
    function isEmpty(obj) {
      var count = 0;
      for (var key in obj) {
        count += 1;    
      }  
      return count === 0;
    } 

    function get() {
      drive.getList({'page': $scope.page}).then(function(posts) {
        $scope.posts = posts;
      });  
    }


    $scope.select = function(post) {
      if (!$scope.selected) {
        $scope.selected = {};
      }
      if (!$scope.selected[post.id]) {
        $scope.selected[post.id] = post;  
      } else {
        delete $scope.selected[post.id];  
        if (isEmpty($scope.selected)) {
          $scope.selected = '';
        }
      }
    }

    $scope.deletePosts = function() {

    } 

    $scope.next = function() {
      $scope.page += 1;
      get();
    }

    $scope.back = function() {
      $scope.page -= 1;
      get();           
    }

    get();

  });
