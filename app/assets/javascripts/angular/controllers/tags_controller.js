app.controller('TagsShowCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.posts = [];
  $scope.busy = false;
  $scope.page = 1;
  $scope.nextPage = function() {
    if ($scope.busy) return;
    $scope.busy = true;

    $http({
      url: '/tags/' + $routeParams.tag,
      method: 'GET',
      params: {"page": $scope.page}
    }).success(function(posts) {
      for(var i = 0; i < posts.length; i ++) {
        $scope.posts.push(posts[i]);
      }
      $scope.page += 1;
      $scope.busy = false;
    }).error(function(data) {
      console.log(data);
    });
  }
}]);
