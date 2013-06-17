@UsersShowController = @app.controller 'UsersShowCtrl', ["$scope", "$routeParams", "Restangular", ($scope, $routeParams, Restangular) ->
  $scope.userId = $routeParams.id
  $scope.user = Restangular.one('users', $routeParams.id).get()
]

@UsersIndexController = @app.controller 'UsersIndexCtrl', ["$scope", "Restangular", ($scope, Restangular) ->
  $scope.users = Restangular.all('users').getList()
]
