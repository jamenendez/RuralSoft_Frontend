/**
 * Created by elporfirio on 19/05/2015.
 */
angular.module('Academica')
    .controller('MenuItemController',['dataSendService', '$scope', 'Menu', '$rootScope', function($dataSendService, $scope, Menu, $rootScope) {
        var self = this;
        $scope.menu = [];
        $scope.menutype = null;
        $scope.usernamemenu = 'usuario';
        $scope.useravatarmenu = null;
        //$scope.logged = false;

        /* LiSTENER */
        //TODO: cambiar el controlador para actualizar los datos
        $rootScope.$on('menu-generado', function(){
            $scope.menu = Menu.getMenu();
            $scope.menutype = Menu.getMenuType();
            $scope.usernamemenu = Menu.getUserNameMenu();
            $scope.useravatarmenu = Menu.getUserAvatarMenu();
            $scope.apply();
        });
        $scope.$on('menu-generado', function(){
            $scope.menu = Menu.getMenu();
            $scope.menutype = Menu.getMenuType();
            $scope.usernamemenu = Menu.getUserNameMenu();
            $scope.useravatarmenu = Menu.getUserAvatarMenu();
            $scope.apply();
        });

        $scope.mainMenu =  [
            {
                vinculo : "#/instituciones",
                texto: "Instituciones"
            },
                        {
                vinculo : "#/comunidad",
                texto: "Comunidad"
            },
            {
                vinculo : "#/biblioteca",
                texto: "Biblioteca"
            },
            {
                vinculo : "#/cursos",
                texto: "Cursos"
            }

/*            {
                vinculo : "/admin",
                texto: "Administración"
            }*/
        ];

        self.checkIfLogin = function(){
            var xhrSend = $dataSendService.sendData('post', '/api/isauth');

            xhrSend.success(function(data, status, headers, config) {
                $scope.logged = data.logged === true;

                if($scope.logged === false){
                    Menu.generar('guest');
                } else {
                    Menu.generar('user');
                }

            }).error(function(data, status, headers, config) {
                console.error(data);
            });
        };

        self.checkIfLogin();
    }]);