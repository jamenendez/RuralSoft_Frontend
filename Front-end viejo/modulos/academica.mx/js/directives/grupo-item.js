/* global angular */
/* global swal */
/*jshint camelcase: false */
(function (angular, undefined) {
  'use strict';

  angular
    .module('Academica.Directivas')
    .directive('acaGrupoItem', GrupoItem)
    .directive('acaGrupoUsuarioItem', GrupoUsuarioItem)
    .directive('acaGrupoContenidoItem', GrupoContenidoItem);

    GrupoContenidoItem.$inject = [];
    function GrupoContenidoItem() {
      return {
        controller: function ($scope, Grupos) {
          $scope.fav_contenido = {
            id: $scope.contenido.id,
            tipo: $scope.contenido.tipo,
          };

          $scope.ocultar_contenido = function (contenido) {
            Grupos.ocultar_contenido({grupo_id: $scope.grupo.id, id: contenido.id, tipo: contenido.tipo}).$promise.then(function (data) {
              contenido.visible = data.visible;
            });
          };

          $scope.borrar_contenido = function (contenido) {
            confirmSwal('Eliminar ' + contenido.tipo, '¿Estás seguro de borrar a ' + contenido.titulo + '?', function (isConfirm) {
              if (isConfirm && contenido) {
                Grupos.borrar_contenido({grupo_id: $scope.grupo.id, id: contenido.id, tipo: contenido.tipo}).$promise.then(function (data) {
                  swal('Has borrado este contenido correctamente');
                  $scope.onContenidoDelete && $scope.onContenidoDelete(contenido);
                });
              }
            });
          };
        },
        link: function ($scope, element, attrs) {

        },
        restrict: 'E',
        replace: true,
        scope: {
          contenido: '=',
          // permisos: '=',
          grupo: '=',
          onContenidoDelete: '=?',
        },
        templateUrl: 'templates/directivas/grupo-contenido-item.html',
      };
    }

    GrupoUsuarioItem.$inject = [];
    function GrupoUsuarioItem() {
      return {
        controller: function ($scope, Grupos) {
          $scope.isChecked = false;

          $scope.$watch('isChecked', function (value) {
            $scope.onChecked && $scope.onChecked($scope.usuario, $scope.isChecked);
          });

          $scope.contenido = {
            id : $scope.grupo.id,
            tipo: 'grupo'
          };

          $scope.openForm = false;

          $scope.role = function (usuario, role) {
            Grupos.role({grupo_id: $scope.grupo.id, id: usuario.id}, {role: role}).$promise.then(function (data) {
              if (data.success) {
                usuario.role = data.role;
              }
            });
          };

          $scope.eliminar = function (usuario) {
            confirmSwal('Eliminar usuario', '¿Estás seguro de borrar a ' + usuario.username + '?', function (isConfirm) {
              if (isConfirm && usuario) {
                Grupos.eliminar_usuario({grupo_id: $scope.grupo.id, id: usuario.id}).$promise.then(function (data) {
                  swal('Has borrado este usuario correctamente');
                  $scope.onUserDelete && $scope.onUserDelete(usuario);
                });
              }
            });
          };

          $scope.abrir_enviar_mensaje = function () {
            $scope.openForm = !$scope.openForm;
          };
        },
        link: function ($scope, element, attrs) {
          attrs.$observe('isChecked', function (value) {
            $scope.isChecked = value === 'true';
          });
        },
        restrict: 'E',
        replace: true,
        scope: {
          usuario: '=',
          grupo: '=',
          onUserDelete: '=?',
          onChecked: '=?'
        },
        templateUrl: 'templates/directivas/grupo-usuario-item.html',
      };
    }

    GrupoItem.$inject = [];
    function GrupoItem($location) {
      return {
        controller: function ($scope, Grupos) {
          $scope.invitation = angular.isDefined($scope.invitation) ? $scope.invitation : false;

          $scope.borrar_grupo = function (grupo) {
            confirmSwal('Eliminar grupo', '¿Estás seguro de borrar a ' + grupo.nombre + '?', function (isConfirm) {
              if (isConfirm && grupo) {
                Grupos.delete({id: grupo.id}).$promise.then(function (data) {
                  // $scope.grupos.splice($scope.grupos.indexOf(grupo), 1);
                  swal('Has borrado este grupo correctamente');
                  $scope.onDelete && $scope.onDelete(grupo);
                });
              }
            });
          };

          $scope.salir_grupo = function (grupo) {
            confirmSwal('Salir de grupo', '¿Estás seguro de salir de ' + grupo.nombre + '?', function (isConfirm) {
              if (isConfirm && grupo) {
                Grupos.salir({grupo_id: grupo.id}).$promise.then(function (data) {
                  swal('Has salido de este grupo correctamente');
                  $scope.onLeave && $scope.onLeave(grupo);
                });
              }
            });
          };

          $scope.aceptar = function (grupo) {
            confirmSwal('Invitación a grupo', '¿Estás seguro unirte a ' + grupo.nombre + '?', function (isConfirm) {
              if (isConfirm && grupo) {
                Grupos.invitacion({id: grupo.id, action: 'add'}).$promise.then(function (data) {
                  swal('Has aceptado la invitación a este grupo');
                  $scope.onAccept && $scope.onAccept(grupo);
                });
              }
            });
          };

          $scope.descartar = function (grupo) {
            confirmSwal('Invitación a grupo', '¿Estás seguro descartar la invitación a ' + grupo.nombre + '?', function (isConfirm) {
              if (isConfirm && grupo) {
                Grupos.invitacion({id: grupo.id, action: 'remove'}).$promise.then(function (data) {
                  swal('Has descartado la invitación de este grupo');
                  $scope.onDiscard && $scope.onDiscard(grupo);
                });
              }
            });
          };
        },
        link: function ($scope, element, attrs) {

        },
        restrict: 'E',
        replace: true,
        scope: {
          invitation: '=?',
          grupo: '=',
          onLeave: '=?',
          onDelete: '=?',
          onAccept: '=?',
          onDiscard: '=?',
        },
        templateUrl: 'templates/directivas/grupo-item.html',
      };
    }

    function confirmSwal(title, text, callback) {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        closeOnConfirm: false,
        closeOnCancel: true
      }, callback);
    }
})(angular);
