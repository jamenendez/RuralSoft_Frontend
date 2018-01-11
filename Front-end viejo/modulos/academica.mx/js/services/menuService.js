/**
 * Created by elporfirio on 27/05/2015.
 */
angular.module('ep.Menu', [])
.factory('Menu', ['$rootScope', '$cookies', function MenuFactory($rootScope, $cookies){
        return {
            menu: [],
            menutype: "",
            usernamemenu: 'sin usuario',
            useravatarmenu: '../images/avatar_aca_30x30.png',

            generar: function(tipo, options){
                /** SE ACTIVA CUANDO UNA COOKIES ESTA SETEADA PARA ACTUALIZAR DATOS DE LA COOKIE **/
                if($cookies.get('cambiosexternos')){
                    this.usernamemenu = $cookies.get('usernamemenu');
                    this.useravatarmenu = $cookies.get('useravatarmenu');
                    $cookies.put('cambiosexternos', false);
                } else if(options !== undefined && options.username !== undefined){
                    this.usernamemenu = options.username;
                    this.useravatarmenu = (options.avatarUrl !== undefined && options.avatarUrl !== 'null') ? options.avatarUrl : this.useravatarmenu;

                    /* SE NECESITA PARA HACER CAMBIOS EN OTRAS INSTANCIAS DEL MENU **/
                    if(options.cambiosexternos !== undefined && options.cambiosexternos){
                        $cookies.put('usernamemenu', this.usernamemenu);
                        $cookies.put('useravatarmenu', this.useravatarmenu);
                        $cookies.put('cambiosexternos', true);
                    }
                }
                this.menutype = tipo;
                if(tipo === "guest"){
                    this.menu = [
                        {
                            type: "boton",
                            texto: "Regístrate",
                            'style': 'margin-top: 10px',
                            'toggle': 'modal',
                            'target' : '#modal-registro'
                        },
                        {
                            type: "link",
                            vinculo: "",
                            texto: "Iniciar sesión",
                            toggle: "modal",
                            target : "#modal-login",
                            'style': 'cursor: pointer'
                        }
                    ];
                } else if(tipo === 'user'){
                    this.menu = [
                        {
                            type: "link",
                            vinculo: "#/mi-perfil",
                            texto: "Mi Perfil"
                        },
                        {
                            type: "link",
                            vinculo: "#/mi-perfil/editar",
                            texto: "Editar Perfil"
                        },
                        {
                            type: "link",
                            vinculo: "#/mi-perfil/cuenta",
                            texto: "Configuración de cuenta"
                        },
                        {
                            type: "divider"
                        },
                        {
                            type: "link",
                            vinculo: "#/logout",
                            texto: "Cerrar Sesión"
                        }
                    ];
                } else if(tipo === 'admin'){
                    this.menu = [
                        {
                            type: "link",
                            vinculo: "#/mi-perfil",
                            texto: "Mi Perfil"
                        },
                        {
                            type: "link",
                            vinculo: "#/mi-perfil/editar",
                            texto: "Editar Perfil"
                        },
                        {
                            type: "link",
                            vinculo: "/admin",
                            texto: "Administración Académica"
                        },
                        {
                            type: "link",
                            vinculo: "#/mi-perfil/cuenta",
                            texto: "Configuración de cuenta"
                        },
                        {
                            type: "divider"
                        },
                        {
                            type: "link",
                            vinculo: "#/logout",
                            texto: "Cerrar Sesión"
                        }
                    ];
                }
                $rootScope.$broadcast('menu-generado');
            },
            getMenu: function(){
                return this.menu;
            },
            getMenuType: function(){
                return this.menutype;
            },
            getUserNameMenu: function(){
                return this.usernamemenu;
            },
            getUserAvatarMenu: function(){
                return this.useravatarmenu;
            }
        }
    }]);
