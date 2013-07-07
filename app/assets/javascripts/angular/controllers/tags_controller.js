app.controller('TagsShowCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http({method: 'GET', url: '/tags/' + $routeParams.tag}) 
    .success(function(posts) {
      $scope.posts = posts;  
    })
    .error(function(data) {
      console.log(data);
    });
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
