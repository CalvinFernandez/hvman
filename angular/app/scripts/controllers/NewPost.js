'use strict';

angular.module('angularApp')
  .controller('NewpostCtrl', function ($scope, $location, Restangular) {

    
    $scope.tinymceOptions = {
      theme: 'advanced', 
      plugins: "uploadimage",
      theme_advanced_buttons1 : "bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright, justifyfull,bullist,numlist,undo,redo,link,unlink, uploadimage"
    }

    $scope.post = {
      tags: []
    };

    $scope.camera = 'images/camera.svg';

    $("#new-post-image").change(function(event) {
      var file = event.target.files[0];   
      var reader = new FileReader(); 
      reader.onload = function(imageFile) {
        $scope.post.post_image = imageFile.target.result;   
        $scope.$apply();
      } 
      reader.readAsDataURL(file);
    });

    $scope.submit = function() {
      Restangular.all('posts').post($scope.post).then(function(post) {
        $location.path('/posts/' + post.id);
      });
    }

    $scope.addTag = function(tag) {
      $scope.post.tags.push(tag);
    }

    $scope.removeTag = function(tag) {
      $scope.post.tags = _.without($scope.post.tags, tag);
    }

    $scope.newImage = function() {
      //$("#new-post-image").click();  
    }
  });
