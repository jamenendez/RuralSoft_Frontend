/**
 * Created by elporfirio on 18/05/2015.
 */
angular.module('Academica', [
    'angulartics',
    'angulartics.google.tagmanager',
    'pascalprecht.translate',
    'validation.match',
    'ajaxService',
    'ngRoute',
    'cgNotify',
    'ngCookies',
    'oc.lazyLoad',
    'angular-md5',
    'Academica.Directivas',
    'Academica.Mensajes',
    'Academica.Biblioteca',
    'ep.erroriFy',
    'ep.Menu',
    'ngSanitize',
    'textAngular',
    'LaravelToken',
    'authCheck'
]).config([
    '$translateProvider',
    '$ocLazyLoadProvider',
    '$analyticsProvider',
    function($translateProvider, $ocLazyLoadProvider, $analyticsProvider){
        $translateProvider.translations('es', translate);
        $translateProvider.preferredLanguage('es');
        $translateProvider.useSanitizeValueStrategy('escaped');

        /* Definición de Alias para carga por demanda */
        $ocLazyLoadProvider.config({
            //debug: true,
            modules: [
                {
                    name: 'AdminUser',
                    files: [
                        'js/controllers/admin-user-controller.js',
                        'js/directives/search-user-input.js',
                        'js/controllers/search-user-controller.js',
                        'js/services/searchUserService.js'
                    ]
                },
                {
                    name: 'AuthUser',
                    files: [
                        'js/controllers/registro-user-controller.js',
                        'js/controllers/login-user-controller.js'
                    ]
                },
                {
                    name: 'CursosCarga',
                    files: ['js/app-Curso.js']
                },
                {
                    name: 'CursosEdx',
                    files: ['js/app-CursoEdx.js']
                },
                {
                    name: 'CursosMex',
                    files: ['js/app-CursoMex.js']
                },
                {
                    name: 'CursosKhan',
                    files: ['js/app-CursoKhan.js']
                },
                {
                    name: 'CursosCoursera',
                    files: ['js/app-CursoCoursera.js']
                },
                {
                    name: 'Instituciones',
                    files: ['js/app-Institucion.js']
                },
                {
                    name: 'Micrositio',
                    files: ['js/app-Micrositio.js']
                },
                {
                    name: 'AjustesCuenta',
                    files: ['js/controllers/cuenta-controller.js']
                },
            ]
        });
    }
])

// Global Filters
    .filter('htmlToPlaintext', function() {
        return function(text) {
            var content = String(text).replace(/<[^>]+>/gm, '');
            content = content.replace(/<img[^>]*>/g, '');
            return content;
        };
    });
