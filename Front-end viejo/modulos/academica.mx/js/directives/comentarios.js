/**
 * Created by elporfirio on 31/08/2015.
 */
angular.module('Academica')
    .directive('comentarios', ['$parse', '$http', '$cookies', comentariosFn]);

function comentariosFn($parse, $http, $cookies){
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'templates/comentarios.html',
        scope: {
            //comentarios: '=data',
            //guardarUrl: '@guardar',
            //slug: '@contenidoSlug'
        },
        bindToController: {
            comentarios: '=data',
            guardarUrl: '@guardar',
            slug: '@contenidoSlug',
            tipo: '@tipoComentario',
            auth: '='
        },
        controller: function($scope){
            var self = this;
            /* Binded to controller */
            //self.comentarios = $scope.comentarios;
            //self.guardarUrl = $scope.guardarUrl;
            //self.slug = $scope.slug;

            self.nuevo = '';
            self.respuesta = [];
            self.currentForm = null;
            self.enviando = false;

            self.agregar = function(comentarioId, localIndex, textoComentario){
                self.enviando = true;
                var currentTime = new Date();
                var ano = currentTime.getFullYear();
                var mes = currentTime.getMonth();
                var dia = currentTime.getDate();
                if(dia < 10){
                    dia = '0' + dia;
                }
                var hora = currentTime.getHours();
                var minuto = currentTime.getMinutes();
                var segundo = currentTime.getSeconds();

                var comentario;
                if(comentarioId != undefined){
                    comentario = textoComentario;
                } else {
                    comentario =  self.nuevo;
                }

                var comentarionuevo = {
                    comentario: comentario,
                    user: {
                        username: $cookies.get('username'),
                        perfil: {
                            imagen: $cookies.get('avatar_url')
                        }
                    },
                    comentario_id: comentarioId,
                    slug: self.slug,
                    created_at: ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto + ":" + segundo
                };

                if(comentarioId != undefined && localIndex != undefined){
                    self.comentarios[localIndex][self.tipo].push(comentarionuevo);
                } else {
                    self.comentarios.push(comentarionuevo);
                }

                _guardar(comentarionuevo);
            };

            self.limpiarForm = function(){
                self.nuevo = '';
                self.respuesta = []; //TODO: recibir index para permitir multiples respuestas activas
                self.enviando = false;
            };

            //Private
            function _guardar(datos){
                $http.post(self.guardarUrl, datos)
                    .then(function(response){
                        console.info(response.data);
                        self.limpiarForm();
                    }, function(response){
                        console.error(response);
                        self.limpiarForm();
                    });
            }

        },
        controllerAs: 'commentCtrl',
        link: function(scope, element, attrs, controller){

            ///* Esta pendiente si el padre tuvo cambios para ejecutar alguna funcion */
            //scope.$watch('comentarios', function(v){
            //    console.info('cambios ' +v);
            //    controller.actualizarDatos();
            //});
            //
            //var formulario = $(element).find('form');
            ////Método B para recibir funciones de attrs
            ////var fn = $parse(attrs['myAction']);
            //
            //formulario.on('submit', function(event){
            //    controller.enviando(formulario, true);
            //    controller.agregar(controller.nuevo);
            //    scope.$apply();
            //    //Método B para ejecutar funciones de attrs
            //    /*scope.$apply(function(){
            //     fn(scope);
            //     });*/
            //});
        }
    };
}
