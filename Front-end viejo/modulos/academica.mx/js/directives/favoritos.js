/*global angular */
/*global swal */
/*jshint camelcase: false */
(function (angular, undefined) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .factory('Favoritos', function ($resource) {
      return $resource('/api/usuarios/:id/favoritos', {}, {
        mis_favoritos: {method:'GET', url: '/api/mis-favoritos'},
        es_favorito: {method:'GET', params: {}, url: '/api/mis-favoritos'},
        guardar_a_mis_favoritos: {method:'POST', url: '/api/mis-favoritos'},
      });
    }).directive('acaFavorito', ['Favoritos', function (Favoritos) {
      return {
        controller: function ($scope) {
          $scope.showText = angular.isDefined($scope.showText) ? $scope.showText : true;
          $scope.es_favorito = false;
          $scope.counts = 0;
          $scope.$watch('contenido', function (contenido) {
            $scope.showCounts && (contenido.showCounts = true);
            if (contenido && contenido.id) {
              Favoritos.es_favorito(contenido).$promise.then(function (data) {
                $scope.es_favorito = !!data.favorito;
                (+data.counts >= 0) && ($scope.counts = data.counts);
              });
            }
          });
        },
        link: function ($scope, element, attrs) {
          element.bind('click', function (event) {
            $scope.showCounts && ($scope.contenido.showCounts = true);
            Favoritos.guardar_a_mis_favoritos({contenido: $scope.contenido}).$promise.then(function (data) {
              $scope.es_favorito = data.favorito;
              (+data.counts >= 0) && ($scope.counts = data.counts);
            }, function (response) {
              // swal('Debes iniciar sesión');
              // alert(response.data);
            });

            event.stopPropagation();
          });
        },
        restrict: 'E',
        replace: true,
        scope: {
          contenido: '=',
          showText: '=?',
          showCounts: '=?'
        },
        templateUrl: '/templates/directivas/favorito.html'
      };
    }]);
})(angular);
