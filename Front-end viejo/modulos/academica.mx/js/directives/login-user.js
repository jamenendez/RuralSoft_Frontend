/**
 * Created by elporfirio on 18/05/2015.
 */
angular.module('Academica')
.directive('modalLoginForm',function(){
        return {
            restrict: 'E',
            templateUrl: 'forms/modal-login.html',
            controller: 'LoginUserController',
            controllerAs: 'loginUserCtrl',
            link: function($scope, $element, $attributes) {
                console.log("Formulario Login -- listo");
                // do what you want here.
                $scope.elemento = $element;
            }
        };
    }).directive('loginForm',function(){
        return {
            restrict: 'E',
            templateUrl: 'forms/login.html',
            controller: 'LoginUserController',
            controllerAs: 'loginUserCtrl',
            link: function($scope, $element, $attributes) {
                console.log("Formulario Login -- listo");
                // do what you want here.
                $scope.elemento = $element;
            }
        };
    });