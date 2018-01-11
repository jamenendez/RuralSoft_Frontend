/**
 * Created by elporfirio on 31/10/15.
 */

angular.module('LaravelToken',[])
    .factory('csfrToken', ['$http', function csfrTokenFactory($http){
        var get = function() {
            return $http.get('letoken');
        };

        return {get: get};
    }]);