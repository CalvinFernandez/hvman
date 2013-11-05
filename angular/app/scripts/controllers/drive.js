'use strict';

angular.module('angularApp')
  .controller('DriveCtrl', function($scope, authService, Session, assertService, Restangular) {
    var drive = Restangular.all('drive');

    $scope.page = 0;
    
    function get() {
      drive.getList({'page': $scope.page}).then(function(posts) {
        $scope.posts = posts;
      });  
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
