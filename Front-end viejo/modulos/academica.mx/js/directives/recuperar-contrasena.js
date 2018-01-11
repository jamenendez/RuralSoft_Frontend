/**
 * Created by elporfirio on 21/05/2015.
 */
angular.module('Academica')
    .directive('recoveryPasswordForm',function(){
        return {
            restrict: 'E',
            templateUrl: 'forms/recuperar-contrasena.html',
            controller: 'RecuperaContrasenaController',
            link: function($scope, $element, $attributes) {
                console.log("Formulario recuperar-contrasena -- listo");
                // do what you want here.//
                //console.info($element.parent());

                $($element).on('success-response', function(){
                    $($element).find("form").slideUp();
                });
            }
        };
    });
