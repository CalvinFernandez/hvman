@UsersShowController = @app.controller 'UsersShowCtrl', ["$scope", "$routeParams", ($scope, $routeParams) ->
  $scope.message = "Users Show Controller"
  $scope.userId = $routeParams.id
]

@UsersIndexController = @app.controller 'UsersIndexCtrl', [
  "$scope", ($scope) ->
    $scope.message = "User Index Controller"
]
