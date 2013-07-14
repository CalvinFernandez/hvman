app.controller('PostsCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.chomp = function(text) {
    return text.substring(0, 300) + " ..."; 
  }

  $scope.voteUp = function(post) {
    post.voted_for = !post.voted_for; 
    post.voted_against = false;

    $http({
      url: 'posts/'+ post.id + '/vote', 
      method: 'POST',
      data: {"vote": true}
    });
  }

  $scope.voteDown = function(post) {
    post.voted_against = !post.voted_against;
    post.voted_for = false;

    $http({
      url: 'posts/'+ post.id + '/vote', 
      method: 'POST',
      data: {"vote": false}
    });
  }
}]);

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
      autocomplete_url: 'tags/autocomplete',
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
