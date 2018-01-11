    function llenaCursos(urlFiltroCursos, csrfTok, archivados){
        $.ajax({
            method: "POST",
            url: urlFiltroCursos,
            data: {
                _token: csrfTok
            },
            error: function (ts) {
                console.log(ts.responseText);
            }
        })
        .done(function (msg) {
            if(archivados == 0){
                $("#contenedorCursos").append(msg)
            }
            else{
                $("#contenedorCursosArchivados").append(msg)
            }
        });
    }
    
    function llenaInstituciones(urlLlenaInstitucion, csrfTok){
        $.ajax({
            method: "POST",
            url: urlLlenaInstitucion,
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
