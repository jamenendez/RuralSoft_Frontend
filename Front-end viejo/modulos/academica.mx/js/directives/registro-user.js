/**
 * Created by elporfirio on 18/05/2015.
 */
angular.module('Academica')
    .directive('registroForm',function(){
        return {
            restrict: 'E',
            templateUrl: 'forms/modal-registro.html',
            controller: 'RegisterUserController',
            link: function($scope, $element, $attributes) {
                console.log("Formulario Registro -- listo");
                // do what you want here.
            }
        };
    });