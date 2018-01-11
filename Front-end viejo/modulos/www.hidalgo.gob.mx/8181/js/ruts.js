var events = [];
//TramServ Sys.Tables
function StartxRuts() {
	for (var i = 0; i < events.length; i++) {
		events[i]();
	};
}

var Ruts = {};

function Reg(func) {
	events.push(func);
}

Reg(function() {

	$('select[data-ruts="enabled"]').each(function(i, item) {
		var checktype = $(this).attr("id");
		var classe = "t1";
		switch(checktype){
			case "ruts-secretarias":
			classe = "t1";
			break;
			case "ruts-dependencias":
			classe = "t2";
			break;
			case "ruts-municipios":
			classe = "t3";
			break;
		}
		var self = this;
		console.log(($(this).find("option")).length);
		this.options = $(this).find("option");
		this.container = $("<div class='ruts_selector'></div>");
		this.container.append($("<h3>"+($(this).attr("ruts-name"))+"</h3>"));
		this.menu = $("<div class='menu'></div>");
		this.links = [];
		for (var i = 0; i < this.options.length; i++) {
			var op = this.options[i];
			var val = $(op).attr("value");
			var line = $(op).attr("data");
			var text = $(op).text();
			var l = $("<a class='"+classe+"' ruts-value='"+val+"'>"+text+"</a>");
			l.option = $(op);
			if (line == "yes") {
				self.menu.append($("<hr>"));
			};
			self.menu.append(l);
			self.links.push(l);
			if (line == "yes") {
				l.css("background-color","#E6E6E6 !important");
			};
			l.click(function(event) {
				event.stopPropagation();
				var val = $(this).attr("ruts-value");
				var check = ($(self).find("option[value='"+val+"']")).attr("selected");
				if (check != "selected") {
					($(self).find("option[value='"+val+"']")).attr("selected","selected");
					$(self).trigger("onchange");
				}
				$("div.ruts_selector").css("border-bottom","4px transparent solid");
				$("div.ruts_selector div.menu").hide();
			});
		};
		this.menu.hide();	
		this.container.append(this.menu);
		$(this).before(this.container);
		//$(this).hide();
		self.open = false;
		this.container.click(function() {
			var check = self.menu.css("display");
			if (check == "block") {
				self.open = false;
				self.menu.hide();
				self.container.css("border-bottom","4px transparent solid");
			} else{
				self.open = true;
				self.menu.show();
				self.container.css("border-bottom","4px #58137D solid");
			};
		});
		$(window).click(function() {
			if (!self.open) {
				self.open = false;
				self.menu.hide();
				self.container.css("border-bottom","4px transparent solid");
			};
		});
	});
});

function Looper(data, processData, done) {
  if (data.length > 0) {
    var loop = function(data, i, processData, done) {
      processData(data[i], i, function() {
        if (++i < data.length) {
          loop(data, i, processData, done);
        } else {
          done();
        }
      });
    };
    loop(data, 0, processData, done);
  } else {
    done();
  }
}

var peticionesstack = 16000;
var peticionescount = 0;

String.prototype.ruts = function(name) {
	var actions = {
		quitcharacteracent:function(text){
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
		},

		quitcharacterBV:function(text){
			if(text.indexOf("b") > -1){ text = text.split("b").join("v"); }
  			return text;
		},

		quitcharacterVB:function(text){
			if(text.indexOf("v") > -1){ text = text.split("v").join("b"); }
  			return text;
		},

		quitcharacterSC:function(text){
			if(text.indexOf("s") > -1){ text = text.split("s").join("c"); }
  			return text;
		},

		quitcharacterCS:function(text){
			if(text.indexOf("c") > -1){ text = text.split("c").join("s"); }
  			return text;
		},

		quitcharacterSZ:function(text){
			if(text.indexOf("s") > -1){ text = text.split("s").join("z"); }
  			return text;
		},

		quitcharacterZS:function(text){
			if(text.indexOf("z") > -1){ text = text.split("z").join("s"); }
  			return text;
		},

		quitcharacterCZ:function(text){
			if(text.indexOf("c") > -1){ text = text.split("c").join("z"); }
  			return text;
		},

		quitcharacterZC:function(text){
			if(text.indexOf("z") > -1){ text = text.split("z").join("c"); }
  			return text;
		},

		quitcharacterLLY:function(text){
			if(text.indexOf("ll") > -1){ text = text.split("ll").join("y"); }
  			return text;
		},

		quitcharacterYLL:function(text){
			if(text.indexOf("y") > -1){ text = text.split("y").join("ll"); }
  			return text;
		}
	}
	return actions[name](this);
    
};

function sendBuzon() {
	var nombre = $("#nombre").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var emailsend = $("#emailsend").val();
	var text = $("#coments").val();
	if (nombre != "") {
		if (email != "") {
			if (phone != "") {
				if (text != "") {
					$.ajax({
					    type: 'POST',
					    url: 'http://'+(document.domain)+':8181/buzonciudadano',
					    data: {"nombre":nombre,"email":email,"phone":phone,"text":text,"emailsend":emailsend},
					    success: function(data){
					       if (data.indexOf("OK") > -1) {
						    	alert("CORREO EXITOSO");
						    	$("#nombre").val("");
								$("#email").val("");
								$("#phone").val("");
								$("#coments").val("");
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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};