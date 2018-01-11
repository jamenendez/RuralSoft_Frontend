/**
 * Created by elporfirio on 03/11/2015.
 */

angular.module('authCheck',[])
    .factory('isAuth', ['$http', '$cookies', '$q', function isAuthFactory($http, $cookies, $q){
        var check = function() {
            if($cookies.get('isauth') != undefined){
                var response = {
                    data : {
                        logged : false
                    }
                };
                return $q(function (resolve, reject) {
                    setTimeout(function() {
                        if ($cookies.get('isauth') == 'true') {
                            response.data.logged = true;
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }, 100);
                });
            }

            var res = $http.get('api/isauth');
            res.then(function(response){
               $cookies.put('isauth', response.data.logged);
            });
            return res;
        };
        return {check: check};
    }]);