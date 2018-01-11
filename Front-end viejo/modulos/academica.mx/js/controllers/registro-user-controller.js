/**
 * Created by elporfirio on 18/05/2015.
 */
angular.module('Academica')
    .controller('Loader' , [
        '$scope',
        '$compile',
        function($scope, $compile){
            var self = this;

            self.cargar = function(){

                $('.modal').modal('hide');
                $('.modal-backdrop').remove();
                $('restore-password-form').remove(); //esto se necesita para eliminar la directiva


                $("body").prepend($compile("<restore-password-form></restore-password-form>")($scope));
                $("#modal-restablecer").modal('show');
            };
            self.cargar();
        }
    ])
    //Registra la petición de nuevo usuario con los datos ingresados
    .controller('RegisterUserController', ['$http', '$translate', RegistrarUsuarioFn])
    .controller('RestablecerContrasenaController', ['$routeParams', 'dataSendService', RestablecerContrasenaFn])
    .controller('RecuperaContrasenaController', ['$http', '$translate', RecuperarContrasenaFn])
    .controller('ActivateUserController', ['$routeParams', 'dataSendService', 'Menu', '$translate', '$location', '$cookies', ActivarUsuarioFn])
    .controller('ChangePasswordController', ['dataSendService', CambiarContrasenaFn])
    .controller('HelpActivationController',['$http', '$translate', AyudaActivacionFn]);

function RegistrarUsuarioFn($http, $translate) {
    "use strict";
    var self = this;

    /* Propiedades */
    self.usuario = {};
    self.cargando = {
        enviando: false
    };
    self.tiporespuesta = null;
    self.mensajes = [];

    self.mostrar = true;
    self.patternEmail = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    self.restablecerAtributos = function() {
        self.cargando.enviado = true;
        self.mensajes = [];
        self.tiporespuesta = null;
    };

    self.reiniciarFormularioRegistro = function() {
        self.cargando.enviando = false;
        self.usuario = {};
    };

    self.mostrarForm = function(form){
        self.mostrar = true;
        self.userData = {};
        self.messages = null;
        form.frm_RegistroUser.$setPristine();
    };

    self.registrarUsuario = function() {
        self.cargando.enviando = true;
        self.restablecerAtributos();

        var respuesta = _registrarUsuario(self.usuario);

        respuesta.then(function(resultado){
            console.warn("REGISTRO", resultado);
            self.tiporespuesta = 'alert-' + resultado.data.type;
            if(resultado.data.success){
                var mensajesParaTraducir = [];
                mensajesParaTraducir.push(resultado.data.msg);

                _traducirMensajes(mensajesParaTraducir);

                self.reiniciarFormularioRegistro();
                self.mostrar = false;
            }
        }, function(resultado){
            console.error(resultado);
            self.tiporespuesta = 'alert-danger';
            var mensajesParaTraducir = [];
            angular.forEach(resultado.data, function(val,index){
                mensajesParaTraducir.push(val[0]);
            });
            _traducirMensajes(mensajesParaTraducir);
            self.cargando.enviando = false;
        });
    };

    //Private Methods
    function _registrarUsuario(datosUsuario){
        return $http.post('/api/registro', datosUsuario);
    }

    function _traducirMensajes(arrayMsg){
        var results = [];
        $translate(arrayMsg).then(function (translations) {
            angular.forEach(translations, function(value, index){
                results.push(value);
            });
	     self.mensajes = results;
        });


       // self.mensajes = results;
    }
}

function RestablecerContrasenaFn($routeParams, $dataSendService){
    var self = this;
    self.typeResponse = null;
    self.messages = null;
    self.passwordData = {
        token : $routeParams.token
    };

    self.resetPassword = function(){

        var xhrSend  = $dataSendService.sendData('post', '/api/resetpassword', {
            reset_token: self.passwordData.token,
            password: self.passwordData.password
        });

        xhrSend.success(function(data, status, headers, config) {
            self.messages = [];
            var respuesta = $dataSendService.formatResponse(data, status);
            self.typeResponse = respuesta.responseType;

            angular.forEach(respuesta.textMessage, function(value, key){
                self.messages.push(value);
            });

            //$("#modal-restablecer").modal('hide');
        }).error(function(data, status, headers, config) {
            self.typeResponse = 'danger';
            self.messages = [];
            var respuesta = $dataSendService.formatResponse(data, status);
            angular.forEach(respuesta.textMessage, function(value, key){
                self.messages.push(value);
            });
        });
    };

    self.showRestablecerForm = function(){
        $("#modal-restablecer").modal('show');
    };
}

function RecuperarContrasenaFn($http, $translate){
    var self = this;
    self.typeResponse = null;
    self.messages = [];
    self.userData = {};
    self.submitter = false;

    self.sendRecoveryToken = function (){
        var respuesta = $http.post('/api/recuperar', {email: self.userData.email});

        respuesta.then(function(resultado){
            self.messages = [];
            var mensajesatraducir = [];
            self.typeResponse = resultado.data.type;


            mensajesatraducir.push(resultado.data.msg);

            _traducirMensajes(mensajesatraducir);

            $("recovery-password-form").trigger("success-response");
        }, function(resultado){
            console.error(resultado);
        });
    };

    function _traducirMensajes(mensajes){
        $translate(mensajes).then(function (translations) {
            var mensajes = [];
            angular.forEach(translations, function(value, index){
                mensajes.push(value);
            });
            self.messages = mensajes;
        });
    }
}

function ActivarUsuarioFn($routeParams, $dataSendService, Menu, $translate, $location, $cookies){
    var self = this;
    self.typeResponse = null;
    self.messages = null;
    self.token = $routeParams.token;
    self.userdata = null;

    self.activateUser = function(){
        var xhrSend  = $dataSendService.sendData('post', '/api/activar', {token: self.token});

        xhrSend.success(function(data, status, headers, config) {
            var mensajerespuesta = [];
            self.messages = [];
            var respuesta = $dataSendService.formatResponse(data, status);
            self.typeResponse = respuesta.responseType;

            angular.forEach(respuesta.textMessage, function(value, key){
                //self.messages.push(value);
                mensajerespuesta.push(value);
            });

            $translate(mensajerespuesta).then(function(translations){
                angular.forEach(translations, function(value, index){
                    self.messages.push(value);
                });
            });

            self.userdata = data.userdata;

            var xhrSendAuth = $dataSendService.sendData('post', '/api/isauth');
            xhrSendAuth.success(function(data, status, headers, config) {
                if(data.logged === false){
                    Menu.generar('guest');
                } else {
                    $cookies.put('username', self.userdata.username);
                    $cookies.put('avatar_url', self.userdata.avatarUrl);

                    Menu.generar('user', self.userdata);
                    $location.path('/mi-perfil');
                    $location.replace();
                }
            }).error(function(data, status, headers, config) {
                self.typeResponse = 'danger';
                self.messages = ["Ocurrio un error en el servidor"];
                console.error(data);
            });

        }).error(function(data, status, headers, config) {
            self.typeResponse = 'danger';
            self.messages = [];
            var respuesta = $dataSendService.formatResponse(data, status);
            angular.forEach(respuesta.textMessage, function(value, key){
                self.messages.push(value);
            });
        });
    };

    self.activateUser();
}

function CambiarContrasenaFn($dataSendService){
    var self = this;
    self.typeResponse = null;
    self.messages = null;
    self.passwordData = {};
    self.submitter = false;

    self.changePassword = function(){
        var xhrSend  = $dataSendService.sendData('post', '/api/changepassword', {
            current_password: self.passwordData.currentpassword,
            password: self.passwordData.password
        });
        self.submitter = true;

        xhrSend.success(function(data, status, headers, config) {
            self.messages = [];
            var respuesta = $dataSendService.formatResponse(data, status);
            self.typeResponse = respuesta.responseType;

            angular.forEach(respuesta.textMessage, function(value, key){
                self.messages.push(value);
            });

            if(data.success === false){
                self.passwordData.currentpassword = '';
            }
            self.submitter = false;

        }).error(function(data, status, headers, config) {
            self.typeResponse = 'danger';
            self.messages = [];
            var respuesta = $dataSendService.formatResponse(data, status);
            angular.forEach(respuesta.textMessage, function(value, key){
                self.messages.push(value);
            });
            self.submitter = false;
        });
    };
}

function AyudaActivacionFn($http, $translate){
    "use strict";
    var self = this;

    self.usuario = {};
    self.mensajes = [];
    self.patternEmail = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    self.tiporespuesta = null;

    self.init = function() {
        $('.modal').modal('hide');
        $('.modal-backdrop').remove();
        $('restore-password-form').remove(); //esto se necesita para eliminar la directiva
    };

    self.reenviarActivacion = function(){
        self.mensajes = [];
        var respuesta = _reenviarActivacion(self.usuario.email);

        respuesta.then(function(resultado){
            var mensajesatraducir = [];

            self.tiporespuesta = 'alert-' + resultado.data.type;
            mensajesatraducir.push(resultado.data.msg);

            _traducirMensajes(mensajesatraducir);
        }, function(resultado){
            self.tiporespuesta = 'alert-danger';
            var mensajesParaTraducir = [];
            angular.forEach(resultado.data, function(val,index){
                mensajesParaTraducir.push(val[0]);
            });
            _traducirMensajes(mensajesParaTraducir);
            self.cargando.enviando = false;
        });
    };
    self.init();

    function _reenviarActivacion(email){
        return $http.post('/api/resendactivation', {email: email});
    }

    function _traducirMensajes(mensajes){
        $translate(mensajes).then(function (translations) {
            var mensajes = [];
            angular.forEach(translations, function(value, index){
                mensajes.push(value);
            });
            self.mensajes = mensajes;
        });
    }
}
