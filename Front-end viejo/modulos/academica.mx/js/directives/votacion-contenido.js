/*global angular */
/*global swal */
/*jshint camelcase: false */
(function (angular, undefined) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .factory('Ratings', function ($resource) {
      return $resource('/api/usuarios/:id/votaciones', {}, {
        mis_votaciones: {method:'GET', url: '/api/mis-votaciones'},
        // es_favorito: {method:'GET', params: {}, url: '/api/mis-favoritos'},
        guardar_a_mis_votaciones: {method:'POST', url: '/api/mis-votaciones'},
      });
    }).directive('acaRatingStar', ['Ratings', function (Ratings) {
      return {
        controller: function ($scope) {
          $scope.$watch('contenido', function (contenido) {
            $scope.contenido = contenido;
            if (contenido.id) {
              Ratings.mis_votaciones(contenido).$promise.then(function (data) {
                $scope.ratingValue = data.tu_rating;
                $scope.average = data.rating;
              });
            }
          });
        },
        link : function(scope, elem, attrs) {
          if (scope.max === undefined) { scope.max = 5;}
          function updateStars() {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
              scope.stars.push({
                filled : i < scope.ratingValue
              });
            }
          }

          scope.toggle = function(index) {
            if (scope.readonly === undefined || scope.readonly === false){
              // scope.ratingValue = index + 1;

              Ratings.guardar_a_mis_votaciones({
                id: scope.contenido.id,
                tipo: scope.contenido.tipo,
                rating: index + 1 //scope.ratingValue
              }).$promise.then(function (data) {
                scope.ratingValue = data.tu_rating;
                scope.average = data.rating;
              }, function (response) {
                // swal('Debes iniciar sesión');
                // alert(response.data);
              });
              /*scope.onRatingSelected({
                rating: index + 1
              });*/
            }
          };

          scope.$watch('ratingValue', function(oldVal, newVal) {
            updateStars();
            // if (newVal) { updateStars(); }
            // if (newVal) { updateStars(); }
          });
        },
        replace: true,
        restrict : 'E',
        scope : {
          contenido: '=',
          // ratingValue : '=ngModel',
          max : '=?', //optional: default is 5
          // onRatingSelected : '&?',
          // readonly: '=?'
        },
        templateUrl: '/templates/directivas/votacion-contenido.html',
      };
    }]);
})(angular);
