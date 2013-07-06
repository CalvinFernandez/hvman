app.controller('UsersShowCtrl', ['$scope', '$routeParams', 'Restangular',  
  function($scope, $routeParams, Restangular) {
    $scope.user = Restangular.one('users', $routeParams.id).get();
  }
]);

app.controller('UsersIndexCtrl', ['$scope', 'Restangular',
  function($scope, Restangular) {
    $scope.users = Restangular.all('users').getList();
  }
])

