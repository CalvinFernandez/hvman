'use strict';

angular.module('angularApp')
  .controller('TopicsCtrl', function ($scope, Restangular) {

    $scope.query = '';

    var topicsIndex = Restangular.all('boards');

    $scope.search = function() {
      topicsIndex.getList({'query': $scope.query}).then(function(topics) {
        $scope.topics = [];
        for (var i = 0; i < topics.length; i ++) {
          $scope.topics.push(topics[i]);
        }
      }); 
    }

    $scope.topics = [];

    topicsIndex.getList().then(function(topics) {
      for (var i = 0; i < topics.length; i ++) {
        $scope.topics.push(topics[i]);
      }
    }); 
  })
  .controller('TopicsShowCtrl', function ($scope, Restangular, $routeParams) {
    var topic = Restangular.one('boards', $routeParams.title);
    $scope.page = 1;
    
    $scope.nextPage = function() {
      if ($scope.busy) return;
      $scope.busy = true;

      topic.get({'query': 'title', 'page': $scope.page }).then(function(topic) {
        $scope.topic.posts.concat(topic.posts);
        $scope.page += 1;
        $scope.busy = false;
      }); 
    }

    topic.get({'query': 'title'}).then(function(topic) {
      $scope.topic = topic;  
    }) 
  });
 
