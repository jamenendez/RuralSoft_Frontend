/**
 * Created by elporfirio on 18/08/2015.
 */
angular.module('Academica')
    .controller('obtenerDatos', [
        '$scope',
        '$http',
        function($scope, $http){
            $scope.imagenesArray = [
                {
                    urlimagen : 'images/noticias/academica.png',
                    titulo: 'Aldea Digital, ahora con muchos más bits',
                    descripcion: 'Con estas razones perdía el pobre caballero el juicio, y desvelábase por entenderlas y desentrañarles el sentido, que no se lo sacara ni las entendiera el mesmo Aristóteles, si resucitara para sólo ello.'
                },
                {
                    urlimagen : 'images/noticias/otra.png',
                    titulo: 'Muestra de arte urbano',
                    descripcion: 'Con estas razones perdía el pobre caballero el juicio, y desvelábase por entenderlas y desentrañarles el sentido, que no se lo sacara ni las entendiera el mesmo Aristóteles, si resucitara para sólo ello.'
                },
                {
                    urlimagen : 'images/noticias/noninis.png',
                    titulo: 'Como pasar tus vacaciones sin dinero, y no morir en el intento',
                    descripcion: 'Con estas razones perdía el pobre caballero el juicio, y desvelábase por entenderlas y desentrañarles el sentido, que no se lo sacara ni las entendiera el mesmo Aristóteles, si resucitara para sólo ello.'
                }
            ];

            $scope.llamarDatosImagenes = function(){
                $http.get('functions.php').
                    then(function(response) {
                        $scope.imagenesArray = response.data;
                    }, function(response) {
                        alert('ocurrio un error');
                    });
            };

            //$scope.llamarDatosImagenes();
        }

    ]);