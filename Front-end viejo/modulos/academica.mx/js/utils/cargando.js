/**
 * Created by elporfirio on 17/11/2015.
 */

angular.module('Academica')
    .directive('cargando', function(){
        return {
            restrict: 'E',
            template: '<div class="sk-folding-cube">' +
                        '<div class="sk-cube1 sk-cube"></div>' +
                        '<div class="sk-cube2 sk-cube"></div>' +
                        '<div class="sk-cube4 sk-cube"></div>' +
                        '<div class="sk-cube3 sk-cube"></div>' +
                    '</div>',
            replace: false
        };
    });