'use strict';

/*
angular.module('angularApp')
  .controller('PostsshowCtrl', 
      function($scope, $routeParams, Restangular, $location, $http) {

        Restangular.one('posts', $routeParams.id).get().then(function(post) {

          delete post["post_image"]; // Remove post image for now paperclip is fucking up//
          $scope.post = post;

          $scope.newComment = '';

        });

        $scope.deletePost = function() {
          if (confirm("Are you sure you want to delete this post?")) { 
            $http({ method: 'DELETE', url: '/api/posts/' + $scope.post.id}).success(function(){
              $location.path('/');
            }).
            error(function() {
              console.log("Deletion Error");
            });
          }
        }

        $scope.update = function() {
          $scope.post.put().then(function() {
            $scope.editContent = false;  
            $scope.editTitle = false;
          });      
        }

        $scope.addComment = function() {
          var comment = {
            content: $scope.newComment, 
            commentable_type: 'Post', 
            commentable_id: $scope.post.id
          }

          $http({ 
            url: '/api/comments',
            method: 'POST',
            data: comment
          });

          $scope.post.comments.push(comment); 
          $scope.newComment = '';
        }
      }
    );
    */
