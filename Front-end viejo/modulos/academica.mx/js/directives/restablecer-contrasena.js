/**
 * Created by elporfirio on 25/05/2015.
 */
angular.module('Academica')
    .directive('restorePasswordForm',function(){
        return {
            restrict: 'E',
            templateUrl: 'forms/modal-restablecer.html',
            controller: 'RestablecerContrasenaController',
            link: function($scope, $element, $attributes) {
                console.log("Formulario restablecer contraseña -- listo");

                $($element[0]).find("#modal-restablecer").modal("show");
                // do what you want here.
            }
        };
    });