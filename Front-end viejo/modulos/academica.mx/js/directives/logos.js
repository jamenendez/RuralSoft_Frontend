/**
 * Created by MSY
 */
angular.module('Academica.Directivas')
    .factory('losLogos', function($http) {
        var factory = {
            getLogosFijos: function() {
                var promise = $http.get('/api/logosFijos');
                return promise;
            },
            getLogos: function() {
                var promise = $http.get('/api/logos');
                return promise;
            }
        };
        return factory;
    })
    .filter('unsafe', function($sce) {
       return function(val) {
          return $sce.trustAsHtml(val);
       };
    })
    .directive('logossocios', ['losLogos', function (losLogos) {
        return {
            controller: function ($scope) {
                $scope.total = 0;
                $scope.posicion = 0;
                losLogos.getLogosFijos().then(function(data) {
                    $scope.logosFijos = data.data.logos;
                });
                losLogos.getLogos().then(function(data) {
                    $scope.logosMovibles = data.data.logos;
                    $scope.total = $scope.logosMovibles.length;
                    $scope.siguiente();
                });
                $scope.siguiente = function() {
                    $scope.logos = {};
                    for (i = 1; i <= 3; i++) { 
                        $scope.logos[i] = $scope.logosMovibles[$scope.posicion];
                        if ( ++$scope.posicion >= $scope.total ) $scope.posicion = 0;
                    }
                }
            },
            link : function() { },
            templateUrl: '/templates/directivas/logos.html'
        };
    }]);
