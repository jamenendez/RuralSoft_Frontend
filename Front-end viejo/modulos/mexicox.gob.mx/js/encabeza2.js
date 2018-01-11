    function busquedaCurso(urlBuscar, csrfTok){
        variable = $('#termino').val();
        $.ajax({
            method: "POST",
            url: urlBuscar,
            data: {
                termino: variable,
                archivado: 0,
                _token: csrfTok
            },
            error: function (ts) {
                console.log(ts.responseText);
            }
        })
        .done(function (msg) {
            $("#contenedorCursos").empty(msg);
            $("#contenedorCursos").append(msg);
            $("#clasificacion").empty();
            $("#clasificacion").append('Resultado de la busqueda');
            $("#selectInstitucion").empty();
        });
        $.ajax({
            method: "POST",
            url: urlBuscar,
            data: {
                termino: variable,
                archivado: 1,
                _token: csrfTok
            },
            error: function (ts) {
                console.log(ts.responseText);
            }
        })
        .done(function (msg) {
            $("#contenedorCursosArchivados").empty(msg);
            $("#contenedorCursosArchivados").append(msg);
            $("#clasificacionArchivados").empty();
            $("#clasificacionArchivados").append('Resultado de la busqueda');
            $("#selectInstitucion").empty();
        });
    }
    
    function llenaCursosCategoria(urlfiltraCursoCat, csrfTok, $element, archivado){
        $.ajax({
            method: "POST",
            url: urlfiltraCursoCat + "/" + $element.attr('value') + "/" + archivado,
            data: {
                _token: csrfTok
            },
            error: function (ts) {
                console.log(ts.responseText);
            }
        })
        .done(function (msg) {
            if(archivado==0){
                $("#clasificacion").empty();
                $("#clasificacion").append($element.html());
                $("#contenedorCursos").empty();
                $("#contenedorCursos").append(msg);
            }
            else{
                $("#clasificacionArchivados").empty();
                $("#clasificacionArchivados").append($element.html());
                $("#contenedorCursosArchivados").empty();
                $("#contenedorCursosArchivados").append(msg);
            }

        });
    }
    
    function llenaInstitucionesCat(urlLlenaInstitucionCat, csrfTok, $element){
        $.ajax({
            method: "POST",
            url: urlLlenaInstitucionCat + "/" + $element.attr('value'),
            data: {
                _token: csrfTok
            },
            error: function (ts) {
                console.log(ts.responseText);
            }
        })
        .done(function (msg) {
            $("#selectInstitucion").empty();
            $("#selectInstitucion").append(msg);
        });
    }