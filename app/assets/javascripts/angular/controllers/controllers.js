angular.module('human.controllers', [])
  .controller('ApplicationCtrl', ['$scope', 'Restangular',
    function($scope, Restangular) {
      $scope.boards = Restangular.all('boards').getList();
    }
  ])
  .controller('UsersShowCtrl', ['$scope', '$routeParams', 'Restangular',  
    function($scope, $routeParams, Restangular) {
      $scope.user = Restangular.one('users', $routeParams.id).get();
    }
  ])
  .controller('UsersIndexCtrl', ['$scope', 'Restangular',
    function($scope, Restangular) {
      $scope.users = Restangular.all('users').getList();
    }
  ])
  .controller('PostsShowCtrl', ['$scope', '$routeParams', 'Restangular', 
    function($scope, $routeParams, Restangular) {
      $scope.postid = $routeParams.id;
      $scope.post = Restangular.one('posts', $routeParams.id).get();
    }
  ])
  .controller('PostsIndexCtrl', ['$scope', 'Restangular',
    function($scope, Restangular) {
      $scope.posts = Restangular.all('posts').getList();
    }
  ])
  .controller('BoardsIndexCtrl', ['$scope', 'Restangular',
    function($scope, Restangular) {
      $scope.boards = Restangular.all('boards').getList();
    }
  ])
  .controller('BoardsShowCtrl',['$scope', '$routeParams', 'Restangular',
    function($scope, $routeParams, Restangular) {
      $scope.board = Restangular.one('boards', $routeParams.id).get();
    }
  ]);
