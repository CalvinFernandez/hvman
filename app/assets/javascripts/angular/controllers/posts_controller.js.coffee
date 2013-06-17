@PostsShowController = @app.controller 'PostsShowCtrl', ["$scope", "$routeParams", "restangular", ($scope, $routeParams, Restangular) ->
  $scope.postId = $routeParams.id
  $scope.post = Restangular.one('posts', $routeParams.id).get()
]

@PostsIndexController = @app.controller 'PostsIndexCtrl', ["$scope", "restangular", ($scope, Restangular) ->
  $scope.posts = Restangular.all('posts').getList()
  $scope.message = "Posts Index Controller"
]
