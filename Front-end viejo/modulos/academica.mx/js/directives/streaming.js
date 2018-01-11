/**
 * Created by MSY
 */
angular.module('Academica.Directivas')
    .factory('elStreaming', function($http) {
        var factory = {
            getStreaming: function() {
                var promise = $http.get('/api/el-streaming');
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
    .directive('streaming', ['elStreaming', function (elStreaming) {
        return {
            controller: function ($scope) {
                elStreaming.getStreaming().then(function(data) {
                    $scope.reproduciendo = 0;
                    $scope.elStreaming = data.data.streaming[$scope.reproduciendo];
                    $scope.losStreaming = data.data.streaming;
                });
                $scope.selStreming = function(indice) {
                    $scope.reproduciendo = indice;
                    $scope.elStreaming = $scope.losStreaming[indice];
                }
            },
            link : function() { },
            templateUrl: '/templates/directivas/streaming.html'
        };
    }]);

    