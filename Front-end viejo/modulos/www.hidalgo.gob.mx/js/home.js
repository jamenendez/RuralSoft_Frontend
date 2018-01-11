function sendBuzon() {
	var nombre = $("#buz_in_nombre").val();
	var email = $("#buz_in_email").val();
	var phone = $("#buz_in_phone").val();
	var text = $("#texta").val();
	if (nombre != "") {
		if (email != "") {
			if (phone != "") {
				if (text != "") {
					$.ajax({
					    type: 'POST',
					    url: 'http://'+(document.domain)+'/buzonciudadano',
					    data: {"nombre":nombre,"email":email,"phone":phone,"text":text},
					    success: function(data){
					       if (data.indexOf("OK") > -1) {
						    	alert("CORREO EXITOSO");
						    	$("#buz_in_nombre").val("");
								$("#buz_in_email").val("");
								$("#buz_in_phone").val("");
								$("#texta").val("");
						    } else{
						    	alert("ÓCURRIO UN ERROR, INTENTE MÁS TARDE");
						    };
					    }
					});
				}else{
					alert("TU 'ASUNTO' ESTA VACÍO");
				};
			}else{
				alert("TU 'TELÉFONO' ESTA VACÍO");
			};
		}else{
			alert("TU 'CORREO ELECTRONICO' ESTA VACÍO");
		};
	}else{
		alert("TU 'NOMBRE' ESTA VACÍO");
	};
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-9519330-1', 'auto');
  ga('send', 'pageview');
  
var StartxFuncs = [];

function Startx() {
	for (var i = 0; i < StartxFuncs.length; i++) {
		StartxFuncs[i]();
	}
}

function StartxAppend(func) {
	StartxFuncs.push(func);
}

var datalinksservice = {
	quitcharacteracent:function(text){
		text = text.toLowerCase();
		text = text.split("á").join("a");
  		text = text.split("é").join("e");
  		text = text.split("í").join("i");
  		text = text.split("ó").join("o");
  		text = text.split("ú").join("u");

  		text = text.split("à").join("a");
  		text = text.split("è").join("e");
  		text = text.split("ì").join("i");
  		text = text.split("ò").join("o");
  		text = text.split("ù").join("u");

  		text = text.split("ü").join("u");
  		text = text.split("ñ").join("n");
  		text = text.split("h").join("");
  		return text;
	}
};

function searchinput(text) {
	text = datalinksservice.quitcharacteracent(text);
	var menu = datalinksservice.datalinks.menu;
	for (var i = 0; i < menu.length; i++) {
		var links = menu[i].data;
		for (var j = 0; j < links.length; j++) {
			var nombre = datalinksservice.quitcharacteracent(links[j].nombre);
			if(nombre.indexOf(text) > -1){
				datalinksservice.datalinks.menu[i].data[j].status = "yes";
			}else{
				var text1 = text.toLowerCase();
				text1 = text1.split(" ");
				var pointes = false;
				for (var h = text1.length; h--; ) {
					var palabra = text1[h];
					if(nombre.indexOf(palabra) > -1){
						pointes = true;
					}
				}
				
				if(pointes){
					datalinksservice.datalinks.menu[i].data[j].status = "yes";
				}else{
					datalinksservice.datalinks.menu[i].data[j].status = "no";
				}
			}
		}
		if(i == menu.length-1){
			datalinksservice.actualize();
		}
	}
}


function restoremenu() {
	var menu = datalinksservice.datalinks.menu;
	for (var i = 0; i < menu.length; i++) {
		var links = menu[i].data;
		for (var j = 0; j < links.length; j++) {
			datalinksservice.datalinks.menu[i].data[j].status = "yes";
		}
		if(i == menu.length-1){
			datalinksservice.actualize();
		}
	}
}

function eventsappend() {
	$("input.searchinput[data='0']").bind('input change paste keyup mouseup',function(i, item) {
		var text = $(this).val();
		$("input.searchinput[data='1']").val(text);
		var setx = (($("body").width() - 1024) /2) + 15;
		var w = $("body").width();
		if(w < 1030){
			setx = 15;
		}
		$("aside#menufloater").css("right",setx+"px");
		$("#menufloater").show();
		if(text.length > 0){
			searchinput(text);
		}else{
			restoremenu()
		}
	});
	
	$("input.searchinput[data='1']").bind('input change paste keyup mouseup',function(i, item) {
		var text = $(this).val();
		$("input.searchinput[data='0']").val(text);
		var setx = (($("body").width() - 1024) /2) + 15;
		var w = $("body").width();
		if(w < 1030){
			setx = 15;
		}
		$("aside#menufloater").css("right",setx+"px");
		$("#menufloater").show();
		if(text.length > 0){
			searchinput(text);
		}else{
			restoremenu()
		}
	});
	
	$("input.searchinput[data='2']").bind('input change paste keyup mouseup',function(i, item) {
		var text = $(this).val();
		searchinput(text);
		if(text.length > 0){
			searchinput(text);
		}else{
			restoremenu()
		}
	});
	
	/*var datos = ["#575757,52","#f6f6f6,39","#092432,429","#FFFFFF,200","#736357,173","#727272,172","#FFFFFF,491","#FFFFFF,530","#092432,480","#FFFFFF,50","#E6E6E6,252","#092432,1075"];
	var myCanvas = document.getElementById("mycanvas");
	var ctx = myCanvas.getContext("2d");
	$("[databg='join']").each(function(i, item) {
		var d = datos[i];
		var s = d.split(",")[1];
		var ele = $(this);
		var off = ele.offset()
		var y = off.top;
		var h = ele.height();
		var c = ele.attr("bg");
		console.log(y,c,h);
		ctx.strokeStyle=c;
		ctx.strokeRect(0, y, 2, s+2);
		ctx.stroke();
	}).promise().done(function(){
		var data = myCanvas.toDataURL();
		console.log(data);
		$("body").css("background-image","url("+data+")");
	});*/
	
}

/*$(function() {
	var plandegobierno = $("<div class='row'></div>");
	var css = {
		"position": "fixed",
		"bottom":"0px",
		"left":"0px",
		"right":"0px",
		"z-index":"99999999",
		"background-color":"#001E30",
		"padding-bottom":"5px"
	};
	var cssbuton = {
	    "width":"270px",
	    "height":"44px",
	    "background-color":"#E73C4E",
	    "border":"0px",
	    "color":" #FFFFFF"
	}
	for(key in css){
		plandegobierno.css(key,css[key]);
	}
	var content = "<div class='col-md-2 col-sm-3 hidden-xs'><center><img src='http://www.hidalgo.gob.mx/images/ncuesta.jpg'></center></div>";
	content += "<div class='col-md-6 hidden-sm hidden-xs'><h3>Encuesta</h3><p>ENCUESTA SOBRE PERCEPCIÓN DE LA CORRUPCIÓN</p><p>Es importante para nosotros conocer tu opinión</p></div>";
	content += "<div class='col-md-4 col-sm-9 col-xs-12'><center><button>¡Participa!</button></center></div>";
	plandegobierno.html(content);
	for(key in cssbuton){
		plandegobierno.find("button").css(key,cssbuton[key]);
	}
	plandegobierno.find("h3").css("color","#71B631");
	plandegobierno.find("h3").each(function() {
		$(this).css("font-size","16px","important");
	});
	plandegobierno.find("p").css("color","#FFFFFF");
	plandegobierno.find("p").css("margin","0px");
	plandegobierno.find("p").css("padding","3px 0px");
	plandegobierno.find("p").each(function() {
		$(this).css("font-size","12px","important");
	});
	plandegobierno.find("img").css("margin-top","10px");
	plandegobierno.find("img").css("width","100px");
	
	plandegobierno.find("button").click(function(){
		var win = window.open("https://docs.google.com/forms/d/e/1FAIpQLSey4pGxG0QzlBfdiIheIjH2TysIkbBuVEqxKrG-TKk2gOaJEg/viewform","_blank");
	});
	
	plandegobierno.find("button").css("margin-top","10px");
	var dateshow = Number(new Date("Fry Oct 28 2016 14:00:00 GMT-0500 (CDT)"));
	if (dateshow < Number(new Date())) {
		$("body").append(plandegobierno);
		
		document.addEventListener("scroll", function(e) {
			var top  = window.pageYOffset || document.documentElement.scrollTop;
			
			if (top > 10) {
				plandegobierno.hide("fast");
			}else{
				plandegobierno.show("fast");
			};
		});
	};
});*/
/*Popup para que aparezcan una vez*/
$(function() {//popup de tenencia
	if (window.location.pathname == "/") {
		if (localStorage.getItem("portaltributario")==null){
			var css = "<style type='text/css'>.vv_fondo{position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;background-color: rgba(0, 0, 0, .8);z-index: 9999999999;}.vv_fondo img{width: 700px;height: auto;cursor:pointer;margin-top:150px}#vv_cerrar{position: fixed;top: 20px;right: 20px;cursor: pointer;z-index: 99999999999;font-size:15px !important;color: #FFF !important;cursor:pointer;}</style>";

			setTimeout(function() {
				$("head").append(css);

				$("body").append("<div class='vv_fondo'><center><img id='tenen' src='http://www.hidalgo.gob.mx/images/tenencia.jpg'></center></div><img id='vv_cerrar' src='http://www.hidalgo.gob.mx/images/tenencia_cerrar.png'>");

				$("#vv_cerrar").click(function(){
					$("#vv_cerrar").hide();
					$('.vv_fondo').hide();
				});

				$("#tenen").click(function() {
					$("#vv_cerrar").hide();
					$('.vv_fondo').hide();
					window.open("http://caasim.hidalgo.gob.mx/?p=2805","_blank");
				});
				localStorage.setItem("portaltributario","OK");
			},2000);
		};
	}
});
/*Popup para que aparezcan varias veces*/
/*$(function() {//popup de tenencia
	if (window.location.pathname == "/") {
		var css = "<style type='text/css'>.vv_fondo{position: fixed;top: 0px;right: 0px;bottom: 0px;left: 0px;background-color: rgba(0, 0, 0, .8);z-index: 9999999999;}.vv_fondo img{width: 700px;height: auto;cursor:pointer;margin-top:150px}#vv_cerrar{position: fixed;top: 20px;right: 20px;cursor: pointer;z-index: 99999999999;font-size:15px !important;color: #FFF !important;cursor:pointer;}</style>";

		setTimeout(function() {
			$("head").append(css);

			$("body").append("<div class='vv_fondo'><center><img id='tenen' src='http://www.hidalgo.gob.mx/images/tenencia.jpg'></center></div><img id='vv_cerrar' src='http://www.hidalgo.gob.mx/images/tenencia_cerrar.png'>");

			$("#vv_cerrar").click(function(){
				$("#vv_cerrar").hide();
				$('.vv_fondo').hide();
			});

			$("#tenen").click(function() {
				$("#vv_cerrar").hide();
				$('.vv_fondo').hide();
				window.open("http://ihfes.hidalgo.gob.mx/","_blank");
			});
		},2000);
	};
});
function op(url){
    window.open(url,"_blank");
}*/


StartxAppend(eventsappend);