angular.module('angularApp').run(['$rootScope', '$location', 'Session', function($rootScope, $location, Session) {
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
  });

  Session.initialize();
 
}]);

