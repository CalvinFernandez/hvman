app.controller('ApplicationCtrl', ['$scope', 'Restangular', '$http',
  function($scope, Restangular, $http) {
    $scope.posts = Restangular.all('posts').getList();

    $scope.chomp = function(text) {
      return text.substring(0, 300) + " ..."; 
    }

    $scope.voteUp = function(id) {
      $http({
        url: 'posts/'+ id + '/vote', 
        method: 'POST',
        data: {"vote": true}
      });
    }

    $scope.voteDown = function(id) {
      $http({
        url: 'posts/'+ id + '/vote', 
        method: 'POST',
        data: {"vote": false}
      });
    }
  }
]);
