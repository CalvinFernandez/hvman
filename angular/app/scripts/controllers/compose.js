'use strict';

angular.module('angularApp')
  .controller('ComposeCtrl', function($scope, authService, Session, assertService, Restangular, $routeParams) {
    
    $scope.post = {};
    $scope.post.title = 'Untitled';
    $scope.post.topics = [];

    var _this = this;

    // Dirty topics is a copy of the array that we'll reference
    // inside the modal. Only until the user clicks 'publish'
    // inside the modal will we update dirty topics. This way
    // if they deside to cancel, they can just revert to 
    // their old changes or status
    ($scope.resetDirtyTopics = function() {
      $scope.dirty_topics = []
      for (var i = 0; i < $scope.post.topics.length; i ++) {
        $scope.dirty_topics.push($scope.post.topics[i]);
      } 
    })();

    if ($routeParams.id) {
      Restangular.one('posts', $routeParams.id).get().then(function(post) {
        $scope.post = post;
        $scope.resetDirtyTopics();
      });
    }

    function topicAt(arr, topic) {
      var title = topic.title;
      if (arr && arr.length !== 0) {
        for (var i = 0; i < arr.length; i ++ ) {
          if (title === arr[i].title) {
            return i;
          }
        }
      }
      return -1; 
    }

    $scope.removeFromTopics = function(topic) {
      var idx = topicAt($scope.dirty_topics, topic);
      if (idx !== -1) {
        $scope.dirty_topics.splice(idx, 1);   
      }
    }

    $scope.addToTopics = function(topic) {
      if (topicAt($scope.dirty_topics, topic) ===  -1) {
        $scope.dirty_topics.push(topic);
      }
    }

    $scope.publish = function() {
      $scope.post.topics = $scope.dirty_topics;
      $scope.post.put();
    }
   
    $scope.save = function(data) {
      $scope.post.content = data;
      $scope.post.put();
    }

    $scope.cancel = function() {
      $scope.resetDirtyTopics();
    }
  }); 
