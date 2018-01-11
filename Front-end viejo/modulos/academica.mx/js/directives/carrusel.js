/**
 * Created by elporfirio on 18/08/2015.
 */
angular.module('Academica')
    .controller('carruselController', [ '$scope', function($scope){
        "use strict";
        var self = this;

        self.contenido = $scope.contenido;


        $scope.$watch('contenido', function(nuevo){
            self.contenido = nuevo;
        });

        self.init = function(){


            //console.info("before", $scope.contenido);
            //
            //setTimeout(function(){
            //    console.info("after party", $scope.contenido);
            //}, 5000);
        };

        self.ligasexternas = function(url){
            var dominiourl = url;
            var dominio = location.host;
            var textoabuscar = dominiourl.indexOf(dominio);

            if (textoabuscar < 0) {
                window.open(url);
            }
            else{
                window.open(url, '_self');
            }
        };

        self.init();
    }])
    .directive('carrusel', function(){
        return {
            restrict: 'E',
            templateUrl: 'templates/carrusel.html',
            controller: 'carruselController',
            controllerAs: 'carruselCtrl',
            replace: true,
            scope: {
                contenido : '='
            },
            link: function(scope,element, attrs, controller){
                var $element = $(element);
                $element.carousel();

                $element.find('#izquierda').on("click", function(){
                    $element.carousel('prev');
                });

                $element.find('#derecha').on("click", function(){
                    $element.carousel('next');
                });


            }
        };
    });
