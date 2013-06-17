@PostsShowController = @app.controller 'PostsShowCtrl', ["$scope", "$routeParams", ($scope, $routeParams) ->
  $scope.message = "Posts Show Controller"
  $scope.postId = $routeParams.id
]

@PostsIndexController = @app.controller 'PostsIndexCtrl', [
  "$scope", ($scope) ->
    $scope.message = "Posts Index Controller"
]
