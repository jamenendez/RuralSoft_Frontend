/* global angular */
/* global swal */
(function (angular, undefined) {
  'use strict';

  angular
  .module('Academica.Servicios')
  .factory('flash', flash);

  flash.$inject = ['$rootScope'];
  function flash($rootScope) {
    var queue = []
      , currentMessage = '';

    /*$rootScope.$on('$routeChangeSuccess', function() {
      currentMessage = queue.shift() || '';
    });*/

    return {
      setMessage: function(message) {
        queue.push(message);
      },
      getMessage: function() {
        return currentMessage;
      },
      message: function () {
        currentMessage = queue.shift() || '';
        if (currentMessage) {
          swal(currentMessage);
        }
      }
    };
  }

})(angular);
