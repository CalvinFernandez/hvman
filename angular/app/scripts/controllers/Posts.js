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
  })

  .controller('PostseditCtrl', function ($scope, Restangular, $routeParams) {
      Restangular.one('posts', $routeParams.id).get().then(function(post) {
        $scope.post = post;
      });
       
      function topicAt(topic) {
        var title = topic.title;
        if ($scope.post.topics && $scope.post.topics.length !== 0) {
          for (var i = 0; i < $scope.post.topics.length; i ++ ) {
            if (title === $scope.post.topics[i].title) {
              return i;
            }
          }
        }
        return -1; 
      }

      $scope.removeFromTopics = function(topic) {
        var idx = topicAt(topic);    
        if (idx !== -1) {
          $scope.post.topics.splice(idx, 1);   
        }
      }

      $scope.addToTopics = function(topic) {
        if (topicAt(topic) ===  -1) {
          $scope.post.topics.push(topic);
        }
      }

      $scope.publish = function() {
        $scope.post.put();            
      }

      $scope.save = function(data) {
        $scope.post.content = data;
      }
  })
  .controller('PostsshowCtrl', 
      function($scope, $routeParams, Restangular, $location, $http) {
        Restangular.one('posts', $routeParams.id).get().then(function(post) {
          delete post["post_image"]; // Remove post image for now paperclip is fucking up//
          $scope.post = post;
        });
  });
