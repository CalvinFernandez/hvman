app.controller('PostsShowCtrl', ['$scope', '$routeParams', 'Restangular', '$location', '$http', 
  function($scope, $routeParams, Restangular, $location, $http) {
    Restangular.one('posts', $routeParams.id).get().then(function(post) {

      delete post["post_image"]; // Remove post image for now paperclip is fucking up//
      $scope.post = post;
    });

    $scope.deletePost = function() {
      if (confirm("Are you sure you want to delete this post?")) { 
        $http({ method: 'DELETE', url: 'posts/' + $scope.post.id}).success(function(){
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
  }
]);

app.controller('PostsIndexCtrl', ['$scope', 'Restangular',
  function($scope, Restangular) {
    $scope.posts = Restangular.all('posts').getList();
  }
]);

app.controller('PostsNewCtrl', ['$scope', '$location', 'Restangular', 
  function($scope, $location, Restangular) {
    $scope.post = {
      tags: []
    };
    $scope.camera = 'assets/camera.svg';

    $("#new-post-image").change(function(event) {
      var file = event.target.files[0];   
      var reader = new FileReader(); 
      reader.onload = function(imageFile) {
        $scope.post.post_image = imageFile.target.result;   
        $scope.$apply();
      } 
      reader.readAsDataURL(file);
    });

    $("#new-post-tags").tagsInput({
      onAddTag: function(tag) { $scope.post.tags.push(tag) },
      onRemoveTag: function(tag) { 
        $scope.post.tags = _.without($scope.post.tags, tag); 
      }
    });

    $scope.submit = function() {
      Restangular.all('posts').post($scope.post).then(function(post) {
        $location.path('/posts/' + post.id);
      });
    }

    $scope.newImage = function() {
      //$("#new-post-image").click();  
    }
  }
]);
