app.controller('ApplicationCtrl', ['$scope', 'Restangular',
  function($scope, Restangular) {
    $scope.boards = Restangular.all('boards').getList();
  }
]);
