/* global angular */
/**
 * Created by elporfirio on 27/05/2015.
 */
/* Archivo principal de rutas para captura de angular */
(function (angular) {
    'use strict';
    angular.module('Academica')
        .config(['$routeProvider', 'authUserProvider', function ($routeProvider, authUserProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/inicio/index.html',
                controller: 'InicioController',
                controllerAs: 'inicioCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/inicio-controller.js'
                        ]);
                    }]
                }
            }).when('/mi-perfil/cuenta', {
                templateUrl: 'templates/miperfil/cuenta.html',
                controller: 'CuentaController',
                controllerAs: 'CuentaCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('AjustesCuenta');
                    }]
                }
            }).when('/curso/:id',{
                templateUrl: 'templates/cursos/academica.html',
                controller: 'CursoController',
                controllerAs: 'CursoCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/curso-academica-controller.js'
                        ]);
                    }]
                }
            }).when('/admin', {
                templateUrl: 'templates/admin/users.html',
                controller: 'AdminUserController',
                controllerAs: 'AdminUsrCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('AdminUser');
                    }]
                }
            }).when('/activar/:token', {
                templateUrl: 'templates/directivas/activar-user.html',
                controller: 'ActivateUserController',
                controllerAs: 'activaUserCtrl'
            }).when('/recuperar/:token', {
                templateUrl: 'templates/registro/recuperar-contrasena.html',
                controller: 'RestablecerContrasenaController',
                resolver: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/registro-user-controller.js'
                        ]);
                    }]
                }
            }).when('/cursos', {
                templateUrl: 'templates/cursos/list.html',
                controller: 'CursoCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('CursosCarga');
                    }]
                }
            }).when('/cursos/edx', {
                templateUrl: 'templates/cursos/edx.html',
                controller: 'CursoEdxCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('CursosEdx');
                    }]
                }
            }).when('/cursos/mex', {
                templateUrl: 'templates/cursos/mex.html',
                controller: 'CursoMexCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('CursosMex');
                    }]
                }
            }).when('/cursos/khan', {
                templateUrl: 'templates/cursos/khan.html',
                controller: 'CursoKhanCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('CursosKhan');
                    }]
                }
            }).when('/cursos/coursera', {
                templateUrl: 'templates/cursos/coursera.html',
                controller: 'CursoCourseraCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('CursosCoursera');
                    }]
                }
            }).when('/instituciones', {
                templateUrl: 'templates/instituciones/list.html',
                controller: 'InstitucionesCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Instituciones');
                    }]
                }
            }).when('/instituciones/:micrositio', {
                templateUrl: 'templates/instituciones/micrositio.html',
                controller: 'MicrositioCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Micrositio');
                    }]
                }
            }).when('/mi-perfil', {
                templateUrl: 'templates/miperfil/perfil-privado.html',
                controller: 'MiPerfilController',
                controllerAs: 'miPerfilCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/mi-perfil-controller.js'
                        ]);
                    }]
                }
            }).when('/mi-perfil/editar', {
                templateUrl: 'forms/editar-perfil.html',
                controller: 'EditarPerfilController',
                controllerAs: 'editPerfilCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/editar-perfil-controller.js',
                            'js/directives/avatar-uploader.js',
                            'bower_components/ng-file-upload/ng-file-upload.js',
                            'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
                            'bower_components/ng-img-crop/compile/minified/ng-img-crop.css',
                            'bower_components/angucomplete-alt/angucomplete-alt.js',
                            'bower_components/angucomplete-alt/angucomplete-alt.css'
                        ]);
                    }]
                }
            }).when('/mis-blogs/', {
                templateUrl: 'templates/blogs/index.html',
                controller: 'BlogsController',
                controllerAs: 'BlogsCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/blogs-controller.js',
                                'bower_components/angularUtils-pagination/dirPagination.js'
                            ]);
                        }
                    ]
                }
            }).when('/mis-ofertas/', {
                templateUrl: 'templates/ofertas/index.html',
                controller: 'OfertasController',
                controllerAs: 'OfertasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/ofertas-controller.js',
                                'bower_components/angularUtils-pagination/dirPagination.js'
                            ]);
                        }
                    ]
                }
            }).when('/mis-preguntas/', {
                templateUrl: 'templates/preguntas/index.html',
                controller: 'PreguntasController',
                controllerAs: 'PreguntasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/preguntas-controller.js',
                                'bower_components/angularUtils-pagination/dirPagination.js'
                            ]);
                        }
                    ]
                }
            }).when('/usuario/:sluguser', {
                templateUrl: 'templates/miperfil/perfil-publico.html',
                controller: 'MiPerfilController',
                controllerAs: 'miPerfilCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'js/controllers/mi-perfil-controller.js'
                        ]);
                    }]
                }
            }).when('/grupos', {
                templateUrl: '/templates/grupos/index.html',
                controller: 'GruposCtrl',
                resolve: {
                    factory: authUserProvider.redirectIfNotAuth,
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['/js/appGrupos.js']);
                    }]
                }
            }).when('/grupos/pendientes', {
                templateUrl: '/templates/grupos/pendientes.html',
                controller: 'GruposPendientesCtrl',
                resolve: {
                    factory: authUserProvider.redirectIfNotAuth,
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['/js/appGrupos.js']);
                    }]
                }
            }).when('/grupos/nuevo', {
                templateUrl: '/templates/grupos/create.html',
                controller: 'GruposNuevoCtrl',
                resolve: {
                    factory: authUserProvider.redirectIfNotAuth,
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['/js/appGrupos.js']);
                    }]
                }
            }).when('/grupos/:id', {
                templateUrl: '/templates/grupos/show.html',
                controller: 'GruposShowCtrl',
                resolve: {
                    factory: authUserProvider.redirectIfNotAuth,
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['/js/appGrupos.js']);
                    }]
                }
            }).when('/grupos/:id/edit', {
                templateUrl: '/templates/grupos/edit.html',
                controller: 'GruposEditCtrl',
                resolve: {
                    factory: authUserProvider.redirectIfNotAuth,
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['/js/appGrupos.js']);
                    }]
                }
            }).when('/grupos/:id/contenidos', {
                templateUrl: '/templates/grupos/show_contenidos.html',
                controller: 'GruposShowContenidosCtrl',
                resolve: {
                    factory: authUserProvider.redirectIfNotAuth,
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['/js/appGrupos.js']);
                    }]
                }
            }).when('/logout', {
                template: '',
                controller: 'LogoutUserController',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['/js/controllers/logout-user-controller.js']);
                    }]
                }
            }).when('/ayuda-activacion', {
                templateUrl: '/templates/help-activation.html',
                controller: 'HelpActivationController',
                controllerAs: 'HelpCtrl'
            }).when('/noticias', {
                templateUrl: 'templates/noticias/index.html',
                controller: 'NoticiasController',
                controllerAs: 'NoticiasCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/js/controllers/noticias-controller.js',
                            'bower_components/angularUtils-pagination/dirPagination.js',
                            'bower_components/angular-social-links/angular-social-links.js',
                            '/js/directives/carrusel.js'
                        ]);
                    }]
                }
            }).when('/noticia/:slug', {
                templateUrl: 'templates/noticias/single.html',
                controller: 'NoticiasController',
                controllerAs: 'NoticiasCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/js/controllers/noticias-controller.js',
                            'bower_components/angular-social-links/angular-social-links.js'
                        ]);
                    }]
                }
            }).when('/blogs/', {
                templateUrl: 'templates/blogs/index.html',
                controller: 'BlogsController',
                controllerAs: 'BlogsCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/blogs-controller.js',
                                'bower_components/angularUtils-pagination/dirPagination.js'
                            ]);
                        }
                    ]
                }
            }).when('/blog/nuevo/', {
                templateUrl: 'templates/blogs/nuevo.html',
                controller: 'BlogsController',
                controllerAs: 'BlogsCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/directives/academica-blog.js',
                                '/js/controllers/blogs-controller.js',
                                'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
                                'bower_components/lodash/dist/lodash.js',
                                '/js/directives/ep-file-uploader.js',
                                '/js/directives/image-uploader.js',
                                '/js/services/ajaxFormSenderService.js'
                            ]);
                        }
                    ]
                }
            }).when('/blog/:slug', {
                templateUrl: 'templates/blogs/single.html',
                controller: 'BlogsController',
                controllerAs: 'BlogsCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/blogs-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js'
                            ]);
                        }
                    ]
                }
            }).when('/blog/editar/:slug', {
                templateUrl: 'templates/blogs/editar.html',
                controller: 'BlogsController',
                controllerAs: 'BlogsCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/directives/academica-blog.js',
                                '/js/controllers/blogs-controller.js',
                                'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
                                'bower_components/lodash/dist/lodash.js',
                                '/js/directives/ep-file-uploader.js',
                                '/js/directives/image-uploader.js',
                                '/js/services/ajaxFormSenderService.js'
                            ]);
                        }
                    ]
                }
            }).when('/comunidad', {
                templateUrl: 'templates/comunidad/index.html',
                controller: 'ComunidadController',
                controllerAs: 'ComunidadCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/comunidad-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js'
                            ])
                        }
                    ]
                }
            }).when('/preguntas/', {
                templateUrl: 'templates/preguntas/index.html',
                controller: 'PreguntasController',
                controllerAs: 'PreguntasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/preguntas-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js',
                                'bower_components/angularUtils-pagination/dirPagination.js'
                            ]);
                        }
                    ]
                }
            }).when('/pregunta/nuevo/', {
                templateUrl: 'templates/preguntas/nuevo.html',
                controller: 'PreguntasController',
                controllerAs: 'PreguntasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/directives/academica-pregunta.js',
                                '/js/controllers/preguntas-controller.js',
                                'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
                                'bower_components/lodash/dist/lodash.js',
                                '/js/directives/ep-file-uploader.js',
                                '/js/directives/image-uploader.js',
                                '/js/services/ajaxFormSenderService.js'
                            ]);
                        }
                    ]
                }
            }).when('/pregunta/:slug', {
                templateUrl: 'templates/preguntas/single.html',
                controller: 'PreguntasController',
                controllerAs: 'PreguntasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/preguntas-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js'
                            ]);
                        }
                    ]
                }
            }).when('/pregunta/editar/:slug', {
                templateUrl: 'templates/preguntas/editar.html',
                controller: 'PreguntasController',
                controllerAs: 'PreguntasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/directives/academica-pregunta.js',
                                '/js/controllers/preguntas-controller.js',
                                'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
                                'bower_components/lodash/dist/lodash.js',
                                '/js/directives/ep-file-uploader.js',
                                '/js/directives/image-uploader.js',
                                '/js/services/ajaxFormSenderService.js'
                            ]);
                        }
                    ]
                }
            }).when('/ofertas/', {
                templateUrl: 'templates/ofertas/index.html',
                controller: 'OfertasController',
                controllerAs: 'OfertasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/ofertas-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js',
                                'bower_components/angularUtils-pagination/dirPagination.js'
                            ]);
                        }
                    ]
                }
            }).when('/oferta/nuevo/', {
                templateUrl: 'templates/ofertas/nuevo.html',
                controller: 'OfertasController',
                controllerAs: 'OfertasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/directives/academica-oferta.js',
                                '/js/controllers/ofertas-controller.js',
                                'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
                                'bower_components/lodash/dist/lodash.js',
                                '/js/directives/ep-file-uploader.js',
                                '/js/directives/image-uploader.js',
                                '/js/services/ajaxFormSenderService.js'
                            ]);
                        }
                    ]
                }
            }).when('/oferta/:slug', {
                templateUrl: 'templates/ofertas/single.html',
                controller: 'OfertasController',
                controllerAs: 'OfertasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/ofertas-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js'
                            ]);
                        }
                    ]
                }
            }).when('/oferta/editar/:slug', {
                templateUrl: 'templates/ofertas/editar.html',
                controller: 'OfertasController',
                controllerAs: 'OfertasCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/directives/academica-oferta.js',
                                '/js/controllers/ofertas-controller.js',
                                'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
                                'bower_components/lodash/dist/lodash.js',
                                '/js/directives/ep-file-uploader.js',
                                '/js/directives/image-uploader.js',
                                '/js/services/ajaxFormSenderService.js'
                            ]);
                        }
                    ]
                }
            }).when('/eventos/', {
                templateUrl: 'templates/eventos/index.html',
                controller: 'EventosController',
                controllerAs: 'EventosCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/eventos-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js',
                                'bower_components/angularUtils-pagination/dirPagination.js'
                            ]);
                        }
                    ]
                }
            }).when('/evento/:slug', {
                templateUrl: 'templates/eventos/single.html',
                controller: 'EventosController',
                controllerAs: 'EventosCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/eventos-controller.js',
                                'bower_components/angular-social-links/angular-social-links.js'
                            ]);
                        }
                    ]
                }
            }).when('/micrositio/edit/:id', {
                templateUrl: '/templates/adm/micrositios/form.html',
                controller: 'EditCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/js/controllers/admin/contenido/app-Micrositio.js'
                            ]);
                        }
                    ]
                }
            }).when('/terminos-de-uso', {
                templateUrl: 'templates/terminos-uso.html'
            }).when('/aviso-de-privacidad', {
                templateUrl: 'templates/aviso-privacidad.html'
            }).when('/ayuda', {
                templateUrl: 'templates/preguntas-frecuentes.html'
            }).when('/quienes-somos', {
                templateUrl: 'templates/quienes-somos.html'
            }).when('/contacto', {
                templateUrl: 'templates/contacto.html',
                controller: 'ContactoController',
                controllerAs: 'ContactoCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'bower_components/angular-recaptcha/release/angular-recaptcha.js',
                                'js/controllers/contacto-controller.js'
                            ]);
                        }
                    ]
                }
            }).when('/busqueda/:tipo/:query?', {
                templateUrl: 'templates/busqueda/busqueda.html',
                controller: 'BusquedaController',
                controllerAs: 'BusquedaCtrl',
                resolve: {
                    lazy: [
                        '$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    '/js/controllers/busqueda-controller.js'
                                ]);
                        }
                    ]
                }
            }).when('/no_invitacion',{
              templateUrl: 'templates/no-invitacion.html'
            })
            .when('/invitacion_expiro',{
              templateUrl: 'templates/invitacion-expiro.html'
            })
            .when('/notfound',{
              templateUrl: 'templates/no-encontrado.html'
            }).otherwise({
                templateUrl: 'templates/no-encontrado.html'
            });
            //.otherwise({ redirectTo: '/' }
        }]);

})(angular);
