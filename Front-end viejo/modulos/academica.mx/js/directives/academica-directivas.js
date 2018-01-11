/* global angular */
/* global swal */
(function (angular) {
  'use strict';

  angular
    .module('Academica.Directivas', [])
    .config(config)
    .factory('alertInterceptor', alertInterceptor);

    config.$inject = ['$httpProvider'];
    function config ($httpProvider) {
      $httpProvider.interceptors.push('alertInterceptor');
    }

    alertInterceptor.$inject = ['$q', '$location'];
    function alertInterceptor($q, $location) {
      return {
        response: function (response) {
          var data = response.data || {};

          if (data.message) {
            swal(data.message.text);
          }

          if (data.meta && data.meta.redirect) {
            console.log(data.meta.redirect);
            $location.path(data.meta.redirect);
          }

          return response || $q.when(response);
        },
        responseError: function (response) {
          if (response.data && response.data.message) {
            if (angular.isString(response.data.message)) swal(response.data.message);
            else if (angular.isObject(response.data.message)) swal(response.data.message.text);
          }

          if (response.status === 404) {
            $location.path('/notfound');
          }

          if (response.data.meta && response.data.meta.redirect) {
            console.log(response.data.meta.redirect);
            $location.path(response.data.meta.redirect);
          }

          return $q.reject(response);
        }
      };
    }
})(angular);
