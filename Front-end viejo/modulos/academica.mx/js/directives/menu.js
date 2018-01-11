/**
 * Created by elporfirio on 01/06/2015.
 */
angular.module('Academica')
    .directive('menuPrincipal', [
        'dataSendService',
        'Menu',
        function(dataSendService, Menu){
            "use strict";
            return {
                //replace: true,                                            

                restrict: 'E',
                templateUrl: 'templates/menu-principal.html',
                //scope: true,
                //controller: 'MenuItemController'
                link: function(scope, element, attrs, controllers) {

                    // Internet Explorer 6-11
                    var isIE = false || !!document.documentMode;
                        // Edge 20+
                    if(isIE==true){
                       // alert('Para navegar en académica, te sugerimos actualizar tu explorador');
                       swal("Para una mejor experiencia de navegación en este sitio, te recomendamos actualizar la versión de tu navegador Web.");
                    }

                    var getMenuInfo, checkIfLogin;

                    scope.menu = [];
                    scope.menutype = null;
                    scope.usernamemenu = 'usuario';
                    scope.useravatarmenu = null;

                    scope.mainMenu =  [
                        {

                            vinculo : "#/quienes-somos",
                            texto: "¿Quiénes somos? "
                        },

                        {
                            vinculo : "#/cursos",
                            texto: "Oferta educativa"
                        },
                        {

                            vinculo : "#/biblioteca",
                            texto: "Biblioteca"
                        },
                        {
                            vinculo : "#/comunidad",
                            texto: "Comunidad"
                        },
                        {

                            vinculo : "#/instituciones",
                            texto: "Instituciones"
                        }
                    ];

                    getMenuInfo = function(){
                        scope.menu = Menu.getMenu();
                        scope.menutype = Menu.getMenuType();
                        scope.usernamemenu = Menu.getUserNameMenu();
                        scope.useravatarmenu = Menu.getUserAvatarMenu();
                    };

                    checkIfLogin = function(){
                        var xhrSend = dataSendService.sendData('post', '/api/isauth');

                        xhrSend.success(function(data, status, headers, config) {
                            scope.logged = data.logged === true;

                            if(scope.logged === false){
                                Menu.generar('guest');
                            } else {
                                if(data.admin){
                                    Menu.generar('admin');
                                } else {
                                    Menu.generar('user');
                                }
                            }

                        }).error(function(data, status, headers, config) {
                            console.error(data);
                        });
                    };

                    scope.$on('menu-generado', function(){
                        getMenuInfo();
                    });

                    checkIfLogin();
                }
            };
        }
    ]);
