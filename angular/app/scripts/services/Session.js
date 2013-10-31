'use strict';

angular.module('angularApp')
  .factory('Session', function ($http, $rootScope, $q) {

    var loggedInUrl = '/api/users/logged_in';
    var logoutUrl = '/api/users/sign_out';
    var loginUrl = '/api/users/sign_in';

    return {
      
      initialize: function() {
        var cached = $rootScope.userLoggedIn;
        if (cached === true || cached === false) {
          $rootScope.userLoggedIn = cached;
        } else {
          $http.get(loggedInUrl).then(function(data) {
            $rootScope.userLoggedIn = data.data === 'true';
          });
        }
      },

      logIn: function(email, password) {
        var deferred = $q.defer();
        $http({ url: loginUrl, method: 'POST', 
          data: {
              user: {
                'password': password,
                'email': email
              }
          }
        }).then(function(data) {
          if (data.status === 200) {
            $rootScope.userLoggedIn = true;
          }
          deferred.resolve(data);
        }, function(data) {
          deferred.reject(data);
        }); 
        return deferred.promise;        
      },

      logOut: function() {
        var deferred = $q.defer();
        $http({ url: logoutUrl, method: 'DELETE' }).then(function(data) {
          if (data.status === 204) {
            $rootScope.userLoggedIn = false;
          }
          deferred.resolve(data); 
        }, function(data) {
          deferred.reject(data);
        });
        return deferred.promise;
      }
    }   
});
