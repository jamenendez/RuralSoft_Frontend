/*global angular */
/*jshint camelcase: false */
(function (angular, undefined) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .factory('GrupoInvitaciones', function ($resource) {
      return $resource('/api/mis-grupos/admin', {}, {
        grupos_usuario: { method: 'GET', params: {}, url: '/api/grupos/moderados' },
        invitar: { method: 'POST', params: {id: '@id'}, url: '/api/grupos/:id/invitar' },
        peticion: { method: 'POST', params: {id: '@id'}, url: '/api/grupos/:id/agregame' }
      });
    }).directive('acaInvitarGrupo', ['GrupoInvitaciones', function (GrupoInvitaciones) {
      return {
        controller: function ($scope) {
          $scope.$watch('username', function (username) {
            if (username) {
              GrupoInvitaciones.get().$promise.then(function (data) {
                $scope.grupos = data.grupos;
              });
            }
          });

          $scope.invitar = function (grupo) {
            GrupoInvitaciones.invitar({id: grupo}, {username: $scope.username}).$promise.then(function (data) {
              $scope.onSuccess && $scope.onSuccess(data);
            });
          };
        },
        link : function(scope, elem, attrs) {
        },
        replace: true,
        restrict : 'E',
        scope: {
          username: '=',
          onSuccess : '=?',
        },
        templateUrl: '/templates/directivas/invitar-grupo.html',
      };
    }]).directive('acaPeticionGrupo', ['GrupoInvitaciones', function (GrupoInvitaciones) {
      return {
        controller: function ($scope) {
          $scope.$watch('username', function (username) {
            if (username) {
              GrupoInvitaciones.grupos_usuario({username: username}).$promise.then(function (data) {
                $scope.grupos = data.grupos;
              });
            }
          });

          $scope.peticion = function (grupo) {
            GrupoInvitaciones.peticion({id: grupo.slug}, {username: $scope.username}).$promise.then(function (data) {
              $scope.onSuccess && $scope.onSuccess(data);
            });
          };
        },
        link : function(scope, elem, attrs) {
        },
        replace: true,
        restrict : 'E',
        scope: {
          username: '=',
          onSuccess : '=?',
        },
        templateUrl: '/templates/directivas/peticion-grupo.html',
      };
    }]);
})(angular);
