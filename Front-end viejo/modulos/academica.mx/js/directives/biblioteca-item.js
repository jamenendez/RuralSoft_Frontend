/* global angular */
(function (angular, undefined) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .filter('joinBy', function () {
      return function (input, delimiter) {
        return (input || []).join(delimiter || ',');
      };
    })
    .directive('stopEvent', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          element.bind(/*attr.stopEvent*/'click', function (e) {
            e.stopPropagation();
          });
        }
      };
    })
    .directive('acaBibliotecaItem', BibliotecaItem)
    .directive('acaBibliotecaItemC', BibliotecaItemC);

    BibliotecaItemC.$inject = ['$location'];
    function BibliotecaItemC($location) {
      return {
        controller: function ($scope) {
          $scope.contenido = {
            id: $scope.item.id,
            tipo: 'biblioteca-item-cosechador',
          };

          $scope.go = function () {
            $scope.itemLink && $location.path($scope.itemLink);
          };
        },
        link: function ($scope, element, attrs) {

        },
        restrict: 'E',
        replace: true,
        scope: {
          item: '=',
          itemLink: '@?',
          // showImage: '=showImage',
          tinyItem: '=tinyItem'
        },
        templateUrl: 'templates/directivas/biblioteca-item-cosechador.html',
      };
    }

    BibliotecaItem.$inject = ['$location'];
    function BibliotecaItem($location) {
      return {
        controller: function ($scope) {
          $scope.contenido = {
            id: $scope.item.id,
            tipo: 'biblioteca-item',
          };

          $scope.go = function () {
            $scope.itemLink && $location.path($scope.itemLink);
          };
        },
        link: function ($scope, element, attrs) {

        },
        restrict: 'E',
        replace: true,
        scope: {
          item: '=',
          itemLink: '@?',
          showImage: '=showImage',
          tinyItem: '=tinyItem'
        },
        templateUrl: 'templates/directivas/biblioteca-item.html',
      };
    }
})(angular);
