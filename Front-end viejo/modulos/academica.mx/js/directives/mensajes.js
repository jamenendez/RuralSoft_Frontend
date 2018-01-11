/*global angular */
/*global swal */
/*jshint camelcase: false */
(function (angular, undefined) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .factory('Mensajes', function ($resource) {
      return $resource('/api/mensajes', {}, {
        mis_mensajes: {method:'GET', url: '/api/mis-mensajes'}
      });
    }).directive('acaMensaje', ['Mensajes', function (Mensajes) {
      var getReceptores = function (scope) {
        var receptores = (angular.isArray(scope.receptores) && scope.receptores.length > 0 && scope.receptores) || [];
        !!scope.receptor && receptores.push(scope.receptor);

        return receptores;
      };

      return {
        controller: function ($scope, $transclude) {
          $scope.data = {};
          $scope.tiny = angular.isDefined($scope.tiny) ? $scope.tiny : true;
          // console.log($transclude());
        },
        link: function ($scope, element, attrs) {
          element.bind('submit', function() {
            var mensaje = {}
              , receptores = getReceptores($scope);

            if (!$scope.conversacion && receptores.length === 0) {
              swal('Debes de establecer uno o más destinatarios');
              return false;
            }

            mensaje = {
              conversacion_id: $scope.conversacion && $scope.conversacion.hash_id,
              receptores : receptores,
              mensaje: $scope.data.mensaje,
              contenido: $scope.contenido || {}
            };

            Mensajes.save(mensaje).$promise.then(function (data) {
              $scope.conversacion && $scope.conversacion.mensajes && $scope.conversacion.mensajes.push(data.mensaje);
              $scope.data = {};
              $scope.acaFormMessage.$setPristine();

              // Ejecuta la función...
              $scope.onSuccess && $scope.onSuccess(data);
            });
          });
        },
        restrict: 'E',
        replace: true,
        scope: {
          receptor: '=',
          receptores: '=',
          contenido: '=',
          conversacion: '=',
          onSuccess : '=?',
          tiny: '=?',
        },
        templateUrl: '/templates/directivas/mensaje.html',
        transclude: true
      };
    }]);
})(angular);
