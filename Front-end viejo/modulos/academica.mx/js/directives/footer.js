/*global angular */
/*global swal */
(function (angular) {
  'use strict';
  angular.module('Academica')
    .directive('footNav', function () {
      return {
        controller: ['$scope', 'dataSendService', function ($scope, $dataSendService) {
          $scope.sendInviteForm = false;
          $scope.data = {};

          $scope.$on('logged', function () {
            $scope.sendInviteForm = true;
          });

          $scope.sendInvite = function (email) {
            // Aquí se debe de mandar el correo de invitación.
            var xhrSend = $dataSendService.sendData('post', '/api/enviar-invitacion', {
              'email' : email
            });

            xhrSend.success(function(data, status, headers, config) {
              swal('Se envió el correo correctamente');
              $scope.data = {};
            }).error(function(data, status, headers, config) {
              console.error(data);
              $scope.data = {};
            });
          };

          function checkIfLogin() {
            var xhrSend = $dataSendService.sendData('post', '/api/isauth');

            xhrSend.success(function(data, status, headers, config) {
              $scope.sendInviteForm = data.logged;
            }).error(function(data, status, headers, config) {
              console.error(data);
            });
          }

          checkIfLogin();
        }],
        replace: true,
        restrict: 'E',
        templateUrl: 'templates/general/footer.html',
      };
    }
  );
})(angular);
