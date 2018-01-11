console.log("Everything was loaded successfully");

$(document).ready(function () {
    /*
     gobierno
     cultura
     economia
     educacion
     salud
     background: #439E37 none repeat scroll 0 0;
     */
    /* Gobierno is the default window */
    var titletemp = "GOBIERNO";
    $("#gobierno").show();
    $("#cultura").hide();
    $("#economia").hide();
    $("#educacion").hide();
    $("#salud").hide();
    $("#header_title").html("<a id=\"mmenu\"><span style=\" cursor:pointer font-size:40px;\" onclick=\"openNav()\">&#9776;</span></a><br> GOBIERNO");


    /* Keep track of the current window */
    /* Listener */
    $('#gobierno_btn').on('click', function () {
        // $( '#qrooframe' ).attr( 'src', function ( i, val ) { return val; });
        $("#cultura").hide();
        $("#economia").hide();
        $("#educacion").hide();
        $("#salud").hide();
        $("#gobierno").show();
        $("#header_title").html("<a id=\"mmenu\"><span style=\" cursor:pointer font-size:40px;\" onclick=\"openNav()\">&#9776;</span></a><br> GOBIERNO");
        $("header").css('background-color', '#439E37');
        $(".breadcrumb").css('background-color', '#439E37');
        $(".content-link").css('background', "#439E37");
        titletemp = "GOBIERNO";
    });

    $('#educacion_btn').on('click', function () {
        $("#cultura").hide();
        $("#economia").hide();
        $("#salud").hide();
        $("#gobierno").hide();
        $("#educacion").show();
        $("#header_title").html("<a id=\"mmenu\"><span style=\" cursor:pointer font-size:40px;\" onclick=\"openNav()\">&#9776;</span></a><br> EDUCACIÓN");
        $("header").css('background-color', '#29AAE3');
        $(".breadcrumb").css('background-color', '#29AAE3');
        $(".content-link").css('background', "#29AAE3");
        titletemp = "EDUCACIÓN";
    });

    $('#salud_btn').on('click', function () {
        $("#cultura").hide();
        $("#economia").hide();
        $("#gobierno").hide();
        $("#educacion").hide();
        $("#salud").show();
        $("#header_title").html("<a id=\"mmenu\"><span style=\" cursor:pointer font-size:40px;\" onclick=\"openNav()\">&#9776;</span></a><br> SALUD");
        $("header").css('background-color', '#662E91');
        $(".breadcrumb").css('background-color', '#662E91');
        $(".content-link").css('background', "#662E91");
        titletemp = "SALUD";
    });

    $('#economia_btn').on('click', function () {
        $("#cultura").hide();
        $("#salud").hide();
        $("#gobierno").hide();
        $("#educacion").hide();
        $("#economia").show();
        $("#header_title").html("<a id=\"mmenu\"><span style=\" cursor:pointer font-size:40px;\" onclick=\"openNav()\">&#9776;</span></a><br> ECONOMÍA");
        $("header").css('background-color', '#C2272D');
        $(".breadcrumb").css('background-color', '#C2272D');
        $(".content-link").css('background', "#C2272D");
        titletemp = "ECONOMÍA";
    });

    $('#cultura_btn').on('click', function () {
        $("#economia").hide();
        $("#salud").hide();
        $("#gobierno").hide();
        $("#educacion").hide();
        $("#cultura").show();
        $("#header_title").html("<a id=\"mmenu\"><span style=\" cursor:pointer font-size:40px;\" onclick=\"openNav()\">&#9776;</span></a><br> CULTURA");
        $("header").css('background-color', '#F15A25');
        $(".breadcrumb").css('background-color', '#F15A25');
        $(".content-link").css('background', "#F15A25");
        titletemp = "CULTURA";
    });


});
