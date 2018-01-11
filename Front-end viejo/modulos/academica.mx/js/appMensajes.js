/* global angular */
(function (angular) {
  'use strict';

  angular.module('Academica.Mensajes',  [
    'ngRoute',
    'ngResource',
    'ngFileUpload',
    'Academica.Servicios',
    /*'ui.bootstrap'*/
  ])
  .config(['$routeProvider', 'authUserProvider', function ($routeProvider, authUserProvider) {
    $routeProvider
      .when('/mensajes', {
        templateUrl: '/templates/mensajes/index.html',
        controller: 'MensajesCtrl',
        resolve: {
          factory: authUserProvider.redirectIfNotAuth
        }
      })
      .when('/mensajes/:hash', {
        templateUrl: '/templates/mensajes/index.html',
        controller: 'MensajesCtrl',
        resolve: {
          factory: authUserProvider.redirectIfNotAuth
        }
      });
  }])
  .controller('MensajesCtrl', MensajesCtrl)
  // .factory('MensajesResource', MensajesResource)
  .filter('getByHash', function() {
    /*jshint camelcase: false */
    return function(input, hash) {
      var i = 0, len = input.length;
      for (; i < len; i++) {
        if (input[i].hash_id === hash) {
          return input[i];
        }
      }
      return null;
    };
  });

  MensajesCtrl.$inject = ['$scope', '$routeParams', '$filter', 'Mensajes', 'authUser'];
  function MensajesCtrl($scope, $routeParams, $filter, Mensajes, authUser) {
    $scope.title = 'Mensajes';
    $scope.filterType = 'usuario';

    function getMensajes(checkHash) {
      /*jshint camelcase: false */
      var page = ($scope.pagination && $scope.pagination.current_page) || 1
        , params = {
          page: page,
          tipo: $scope.filterType,
        };

      if (checkHash && $routeParams.hash) {
        Mensajes.mis_mensajes({hash: $routeParams.hash}).$promise.then(function (data) {
          var found;
          $scope.mensajes = data.conversaciones;
          found = $filter('getByHash')($scope.mensajes, $routeParams.hash);
          found && $scope.setMessageThread(found);
        });
        return true;
      }

      Mensajes.mis_mensajes(params).$promise.then(function (data) {
        $scope.mensajes = data.conversaciones;
        $scope.pagination = data.meta.pagination;
      });
    }

    getMensajes(true);

    $scope.pageChanged = function() {
      getMensajes();
    };

    $scope.toggleMessages = function (type) {
      /*jshint camelcase: false */
      $scope.setMessageThread(false);
      $scope.filterType = type;
      $scope.pagination && ($scope.pagination.current_page = 1);
      getMensajes();
    };

    $scope.byType = function (item) {
      /*jshint camelcase: false */
      if ($scope.filterType === 'grupo') {
        return item.contenido_relacionado;
      }
      return !item.contenido_relacionado;
    };

    $scope.setMessageThread = function (messageThread) {
      /*jshint camelcase: false */
      $scope.messageThread = messageThread;
      if (messageThread && messageThread.contenido_relacionado) {
        $scope.title = 'Mensajes de ' + messageThread.contenido_relacionado.nombre;
        $scope.filterType = 'grupo';
      } else if (messageThread && messageThread.receptor) {
        $scope.title = 'Mensajes con ' + messageThread.receptor.username;
        $scope.filterType = 'usuario';
      } else {
        $scope.title = 'Mensajes';
      }
    };
  }

  // MensajesResource.$inject = ['$resource'];
  // function MensajesResource ($resource) {
  //   return $resource('/api/mensajes/:id', {id: '@id'}, {
  //
  //   });
  // }

})(angular);
