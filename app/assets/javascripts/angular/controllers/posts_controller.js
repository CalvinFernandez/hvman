angular.module('human.controllers', [])
  .controller('PostsShowCtrl', 
    ['$scope', '$routeParams', 'restangular', 
    function($scope, $routeParams, Restangular) {
      $scope.postid = $routeparams.id
      $scope.post = Restangular.one('posts', $routeparams.id).get()
    }
  ])
  .controller('PostsIndexCtrl', 
    ['$scope', 'restangular',
    function($scope, Restangular) {
      $scope.posts = Restangular.all('posts').getlist()
    }
  ]);
