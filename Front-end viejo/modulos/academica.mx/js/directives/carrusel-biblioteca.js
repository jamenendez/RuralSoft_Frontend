/* global angular */
(function (angular) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .directive('acaCarrusel', Carrusel);

    Carrusel.$inject = [];
    function Carrusel() {
      return {
        controller: function () {

        },
        link: function (scope, element, attrs) {
          var $element = $(element);
          $element.carousel({
            interval: 10000
          });
        },
        restrict: 'E',
        replace: true,
        scope: {
          items: '='
        },
        templateUrl: 'templates/directivas/carrusel-biblioteca.html',
      };
    }
})(angular);
