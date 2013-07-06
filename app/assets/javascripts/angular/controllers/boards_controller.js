app.controller('BoardsIndexCtrl', ['$scope', 'Restangular',
  function($scope, Restangular) {
    $scope.boards = Restangular.all('boards').getList();
  }
]);

app.controller('BoardsShowCtrl',['$scope', '$routeParams', 'Restangular',
  function($scope, $routeParams, Restangular) {
    $scope.board = Restangular.one('boards', $routeParams.id).get();
  }
]);
