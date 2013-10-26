'use strict';

angular.module('angularApp')
  .controller('TopicsCtrl', function ($scope, Restangular) {

    $scope.query = '';

    var boardsIndex = Restangular.all('boards');

    $scope.search = function() {
      console.log("hello, world");
      boardsIndex.getList({'query': $scope.query}).then(function(boards) {
        $scope.topics = [];
        for (var i = 0; i < boards.length; i ++) {
          $scope.topics.push(boards[i]);
        }
      }); 
    }

    $scope.topics = [];

    boardsIndex.getList().then(function(boards) {
      for (var i = 0; i < boards.length; i ++) {
        $scope.topics.push(boards[i]);
      }
    }); 
  })
 
