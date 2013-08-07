angular.module('angularApp').run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
  });
}]);

