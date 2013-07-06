app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('event:auth-loginRequired', function() {
    window.location.href = '/users/sign_in';
  });
}]);

