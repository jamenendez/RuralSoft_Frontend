/*global angular */
/*jshint camelcase: false */
(function (angular, undefined) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .factory('Seguidores', function ($resource) {
      return $resource('/api/usuarios/:id/seguidores', {}, {
        mis_seguidos: {method:'GET', url: '/api/mis-usuarios-seguidos'},
        mis_seguidores: {method:'GET', url: '/api/mis-seguidores'},
        es_seguido: {method:'GET', params: {}, url: '/api/mis-usuarios-seguidos'},
        guardar_a_mis_seguidos: {method:'POST', url: '/api/mis-usuarios-seguidos'},
      });
    }).directive('acaSeguir', ['Seguidores', function (Favoritos) {
      return {
        controller: function ($scope) {
            $scope.es_seguido = null;

            $scope.seguimiento = function(){
                $scope.$watch('username', function (username) {
                    if (username) {
                        Favoritos.es_seguido({username: username}).$promise.then(function (data) {
                            $scope.es_seguido = !!data.es_seguido;
                        });
                    }
                });
            };

            $scope.inicializar = function(){
                $scope.es_seguido = false;
                $scope.estilo = ($scope.estilo !== undefined) ? $scope.estilo : 'boton';
                if($scope.verificar || $scope.verificar === undefined){
                    $scope.seguimiento();
                } else {
                    $scope.es_seguido = true;
                }
            };

            $scope.inicializar();
        },
        link: function ($scope, element, attrs) {
          element.bind('click', function() {
            Favoritos.guardar_a_mis_seguidos({username: $scope.username}).$promise.then(function (data) {
              $scope.es_seguido = data.es_seguido;
              $scope.onSuccess && $scope.onSuccess(data.es_seguido);
            });
          });
        },
        restrict: 'E',
        replace: true,
        scope: {
          username: '=',
          onSuccess : '=?',
            estilo: '@',
            verificar: '='
        },
        templateUrl: '/templates/directivas/seguir-usuario.html'
      };
    }]);
})(angular);
