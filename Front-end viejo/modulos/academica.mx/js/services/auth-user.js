/* global angular */
(function (angular, undefined) {
  'use strict';

  angular
  .module('Academica.Servicios', [])
  .provider('authUser', AuthUser);

  //AuthUser.$inject = ['$http'];
  function AuthUser() {
    this.$get = ['$rootScope', '$location', function ($rootScope, $location) {
      return {

      };
    }];

    this.redirectIfNotAuth = ['$q', '$http', '$rootScope', '$location', 'flash', function ($q, $http, $rootScope, $location, flash) {
      if ($rootScope.isAuth) {
        return true;
      } else {
        var deferred = $q.defer();
        $http.post('/api/isauth', { /*userToken: 'token'*/ })
        .success(function (response) {
          if (response.logged) {
            $rootScope.isAuth = response.isAuth;
            deferred.resolve(true);
          } else {
            deferred.reject();
            flash.setMessage('No has iniciado sesión');
            $location.path('/');
          }
        })
        .error(function () {
          deferred.reject();
          $location.path('/');
        });
        return deferred.promise;
      }
    }];
  }

})(angular);
