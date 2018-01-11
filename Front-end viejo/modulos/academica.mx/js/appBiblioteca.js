/*global angular */
/*global Clipboard */
/*jshint camelcase: false */
(function (angular, Clipboard) {
  'use strict';

  angular.module('Academica.Biblioteca',  [
    'ngRoute',
    'ngResource',
  ])
  .config(['$routeProvider', function ($routeProvider) {
    var clipboard = new Clipboard('.btn-clipboard');

    clipboard.on('success', function(e) {
        alert('Se copió la cita correctamente');
        // e.clearSelection();
    });

    $routeProvider
      .when('/biblioteca', {
        templateUrl: '/templates/biblioteca/index.html',
        controller: 'BibliotecaCtrl'
      })
      .when('/biblioteca/cosechador', {
        templateUrl: '/templates/biblioteca/cosechador.html',
        controller: 'BibliotecaCosechadorCtrl'
      })
      .when('/biblioteca/cosechador/:id', {
        templateUrl: '/templates/biblioteca/cosechador_show.html',
        controller: 'BibliotecaCosechadorShowCtrl'
      })
      .when('/biblioteca/:id', {
        templateUrl: '/templates/biblioteca/show.html',
        controller: 'BibliotecaShowCtrl'
      }).when('/biblioteca-item/:id', {
        templateUrl: '/templates/biblioteca/show.html',
        controller: 'BibliotecaShowCtrl'
      });
  }])
  .controller('BibliotecaCtrl', BibliotecaCtrl)
  .controller('BibliotecaShowCtrl', BibliotecaShowCtrl)
  .controller('BibliotecaCosechadorCtrl', BibliotecaCosechadorCtrl)
  .controller('BibliotecaCosechadorShowCtrl', BibliotecaCosechadorShowCtrl)
  .factory('Biblioteca', BibliotecaResource);

  BibliotecaCosechadorShowCtrl.$inject = ['$scope', '$sce', '$routeParams', 'Biblioteca'];
  function BibliotecaCosechadorShowCtrl($scope, $sce, $routeParams, Biblioteca) {
    $scope.item = $scope.recomendados = {};
    $scope.showAllInfo = false;

    function init() {
      Biblioteca.cosechador_show({id: $routeParams.id}, function (data) {
        $scope.item = data.item;
        // $scope.recomendados = data.recomendados;
        $scope.contenido = {
          id: $scope.item.id,
          tipo: 'biblioteca-item-cosechador',
        };
      });
    }

    $scope.$on('logged', function () {
      init();
    });

    $scope.registrate = function () {
      alert('Registrate');
    };

    $scope.toggleInfo = function () {
      $scope.showAllInfo = !$scope.showAllInfo;
    };

    $scope.renderHtml = function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };

    init();
  }


  BibliotecaCosechadorCtrl.$inject = ['$scope', 'Biblioteca'];
  function BibliotecaCosechadorCtrl($scope, Biblioteca) {
    $scope.items = [];
    Biblioteca.cosechador(function (data) {
      $scope.items = data.items;
      $scope.spec = data.spec;
    });
  }

  BibliotecaCtrl.$inject = ['$scope', 'Biblioteca'];
  function BibliotecaCtrl($scope, Biblioteca) {
    $scope.items = $scope.destacados = [];

    Biblioteca.get(function (data) {
      $scope.items = data.items;
      $scope.destacados = data.destacados;
    });
  }

  BibliotecaShowCtrl.$inject = ['$scope', '$sce', '$routeParams', 'Biblioteca'];
  function BibliotecaShowCtrl($scope, $sce, $routeParams, Biblioteca) {
    $scope.item = $scope.recomendados = {};
    $scope.showAllInfo = false;

    function init() {
      Biblioteca.get({id: $routeParams.id}, function (data) {
        $scope.item = data.item;
        $scope.recomendados = data.recomendados;
        $scope.contenido = {
          id: $scope.item.id,
          tipo: 'biblioteca-item',
        };
      });
    }

    $scope.$on('logged', function () {
      init();
    });

    $scope.registrate = function () {
      alert('Registrate');
    };

    $scope.toggleInfo = function () {
      $scope.showAllInfo = !$scope.showAllInfo;
    };

    $scope.renderHtml = function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };

    init();
  }

  BibliotecaResource.$inject = ['$resource'];
  function BibliotecaResource ($resource) {
    return $resource('/api/biblioteca/:id', {id: '@id'}, {
      cosechador: {method: 'GET', params: {id: '@id'}, url: '/api/biblioteca/cosechador'},
      cosechador_show: {method: 'GET', params: {id: '@id'}, url: '/api/biblioteca/cosechador/:id'},
    });
  }
})(angular, Clipboard);
