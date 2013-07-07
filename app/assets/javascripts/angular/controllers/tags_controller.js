app.controller('TagsShowCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http({method: 'GET', url: '/tags/' + $routeParams.tag}) 
    .success(function(posts) {
      $scope.posts = posts;  
    })
    .error(function(data) {
      console.log(data);
    });
}]);
