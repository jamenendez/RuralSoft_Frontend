
/**
 * Created by elporfirio on 18/05/2015.
 * Editado el 25/11/2015
 */
angular.module('Academica')
    .controller('LoginUserController', [
        '$http',
        '$scope',
        '$compile',
        'notify',
        'Menu',
        '$rootScope',
        '$cookies',
        'md5',
        LoginControllerFn]);

function LoginControllerFn($http, $scope, $compile, notify, Menu, $root, $cookies , md5) {
    "use strict";
    var self = this;

    //Propiedades
    self.usuariologin = {
        recordar: false
    };
    self.submitter = false;
    self.typeResponse = null;
    self.messages = null;
    self.patterntexto = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    self.showactivatehelp = false;

    self.mensajes = [];
    self.tiporespuesta = null;
    self.cargando = {
        enviando: true
    };

    //Métodos Publicos
    self.vaciarMensajes = function(){
        self.mensajes = [];
    };

    self.getMessages = function(){
        return self.messages;
    };

    self.reiniciarControlRespuesta = function() {
        self.cargando.enviando = true;
        self.messages = [];
        self.tiporespuesta = null;
    };

    self.reiniciarFormulario = function() {
        self.cargando.enviando = false;
        self.usuariologin = {};
    };



    /* Elimina todas las cookies creadas a excepcion del token de Laravel */
    self.eliminarCookiesUsuario = function(){
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
            if(k != 'XSRF-TOKEN'){
                $cookies.remove(k);
            }
        });
    };


    self.verificarPerfilCompleto = function(){
        var respuesta = _obtenerEstadoPerfil();

        respuesta.then(function(results){
            if(!results.data.completo){
                notify({
                    messageTemplate: "<span>¡Bienvenid@ a Académica! <br>" +
                    "Te invitamos a completar tu perfil. Haz clic <a href='/#/mi-perfil/editar'>Aquí</a></span>"
                });
            }
        }, function(results){
            console.info(results);
        });
    };

    self.iniciarSesion = function() {
        self.reiniciarControlRespuesta();

        self.usuariologin.password = md5.createHash(self.usuariologin.password);

        var respuesta = _enviarDatosLogin(self.usuariologin);

        respuesta.then(function(resultado){
            $scope.$broadcast('show-errors-reset');
            self.mensajes = [];

            if(resultado.data.success === true){
                self.verificarPerfilCompleto();

                $($scope.elemento).closest('modal-login-form').children().modal('hide');

                $cookies.put('username', resultado.data.userdata.username);
                $cookies.put('avatar_url', resultado.data.userdata.avatarUrl);
                $cookies.put('isauth', true);

                if(resultado.data.userdata.admin){
                    Menu.generar('admin', resultado.data.userdata);
                } else {
                    Menu.generar('user', resultado.data.userdata);
                }

                self.reiniciarFormulario();
                $root.$broadcast('logged');
            }

            if(resultado.data.success === false){
                self.mensajes.push(resultado.data.msg);
                self.tiporespuesta = 'alert-' + resultado.data.type;
                console.warn(resultado.data.type);
                self.usuariologin.password = "";

                self.cargando.enviado = false;

                /* prueba */
                self.showLoginForm(true);
            }

            /* Verificamos inactividad para quitar el formulario y agregar un
             un botón para reenviar la activación de usuario
             */
            if(resultado.data.success === false && resultado.data.status !== undefined) {
                self.showLoginForm(false);
                if(resultado.data.status === "no_activo"){
                    self.showactivatehelp = true;
                } else if (resultado.data.status === "bloqueado"){
                    self.showactivatehelp = false;
                }

            }

        }, function(resultado){
            console.error(resultado);
            self.tiporespuesta = 'alert-danger';
            angular.forEach(resultado.data, function(val,index){
               self.mensajes.push(val[0]);
            });
            self.reiniciarFormulario();
        });
    };

    self.logoutUser = function(){
        var respuesta = $http.get('get', '/api/logout');

        respuesta.then(function(resultados){
            self.eliminarCookiesUsuario();
        }, function(resultados){
            console.error(resultados);
        });
    };

    /* Muestra u oculta el formulario de inicio de sesión */
    self.showLoginForm = function(option){
        var target = $($scope.elemento).find("form");

        if(option === false){
            target.slideUp();
            self.showactivatehelp = true;
        } else {
            target.slideDown();
            self.showactivatehelp = false;
        }

        $("#modal-login").on('hidden.bs.modal', function (e) {
            // do something...
            $scope.$digest();
            self.vaciarMensajes();
            self.showLoginForm(true);
        });
    };

    self.showRestoreForm = function(){
        var target = $($scope.elemento[0]).find("form");
        var parent = target.parent();
        target.slideUp();
        parent.html($compile("<recovery-password-form></recovery-password-form>")($scope));
        $("#modal-login-label").html("Recuperar");

        $("#modal-login").on('hidden.bs.modal', function (e) {
            // do something...
            $("#modal-login-label").html("Iniciar Sesión");
            parent.html($compile("<login-form></login-form>")($scope));
        });
    };

    self.recordarUsuario = function(){
        var respuesta = _recordarUsuario();

        respuesta.then(function(resultado){
            if(resultado.data.userdata !== null){                
                $cookies.put('username', resultado.data.userdata.username);
                $cookies.put('avatar_url', resultado.data.userdata.avatar_url);
                $cookies.put('isadmin', resultado.data.userdata.admin);

                self.inicializarUsuario();
            } else {
                self.eliminarCookiesUsuario();
                Menu.generar('guest');
            }
        }, function(resultado){
            console.error(resultado);
        });
    };

    self.inicializarUsuario = function(){
        if($cookies.get('username') === undefined){
            self.recordarUsuario();
        } else {
            self.usuariologin.username = $cookies.get('username');
            self.usuariologin.avatarUrl = $cookies.get('avatar_url');
            self.usuariologin.admin = $cookies.get('isadmin');

            //aqui validar si es admin de nuevo :P
            if(self.usuariologin.admin){
                Menu.generar('admin', self.usuariologin);
            } else {
                Menu.generar('user', self.usuariologin);
            }

        }
    };

    self.init = function(){
        self.inicializarUsuario();
    };

    // Inicializador
    self.init();

    // Private Methods
    function _recordarUsuario(){
        return $http.get('/api/remember');
    }

    function _obtenerEstadoPerfil(){
        return $http.get('api/verificar-perfil-completo');
    }

    function _enviarDatosLogin(datosUsuario){
        return $http.post('/api/login', datosUsuario);
    }

    function _forceArray(data){
        return angular.isArray(data) ? data : [data];
    }
}
