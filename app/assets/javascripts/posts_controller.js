app.controller('PostsShowCtrl', ['$scope', '$routeParams', 'Restangular', 
  function($scope, $routeParams, Restangular) {
    $scope.postid = $routeParams.id;
    $scope.post = Restangular.one('posts', $routeParams.id).get();
  }
]);

app.controller('PostsIndexCtrl', ['$scope', 'Restangular',
  function($scope, Restangular) {
    $scope.posts = Restangular.all('posts').getList();
  }
]);
