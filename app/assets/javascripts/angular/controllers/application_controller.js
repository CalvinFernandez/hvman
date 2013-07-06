app.controller('ApplicationCtrl', ['$scope', 'Restangular',
  function($scope, Restangular) {
    $scope.posts = Restangular.all('posts').getList();
    $scope.chomp = function(text) {
      return text.substring(0, 300) + " ..."; 
    }
  }
]);
