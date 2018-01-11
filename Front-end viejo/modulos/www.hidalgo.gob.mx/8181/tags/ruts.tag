<ruts>
	<nav id="header">
		<center>
			<div class="contenido row">
				<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
					<center><img class="logo" src="images/logo.png"></center>
				</div>
				<div class="col-lg-9 col-md-9 col-sm-9 col-xs-8">
					<select id="searctag" onchange={ busquedainput } multiple data-role="tagsinput" placeholder="¿Qué estás buscando? (Presiona 'ENTER' para comenzar a filtrar)">
					</select>
				</div>
				<div class="col-lg-1 col-md-1 col-sm-1 hidden-xs">
					<center>
						<button onclick={ triggersearch } type="button" class="search btn btn-default">
							<span class="glyphicon glyphicon-search"></span>
						</button>
					</center>
				</div>
			</div>
		</center>
	</nav>

	<center>
	<div id="website">
		<div class="menuinter row">
			<div class="col-lg-1 col-md-1 col-sm-1 hidden-xs"></div>
			<div class="col-lg-2 col-md-2 col-sm-3 hidden-xs">
				<h6>Filtros de búsqueda</h6>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-3 hidden-xs">
				<button onclick={ selectall } id="todos" type="button" class="btn btn-default selected">Limpiar búsqueda</button>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-4 col-xs-8">
				<select onchange={ changetags } id="ruts-dependencias" multiple data-ruts="enabled" ruts-name="Secretarías y Dependencias" show={ false }>
					<option each={dep, i in dependenciasshow } data="{ dep.h }" value="{ dep.nombre }">{ dep.nombre }</option>
				</select>
			</div>
		</div><hr>
		<div class="tagsinter row">
			<div class="col-lg-1 col-md-1 col-sm-1 hidden-xs"></div>
			<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">
				<span each={ tag, i in tagsfil } class="{ tag.c }" onclick={ deletetag }>{ tag.t }</span>
			</div>
			<div class="col-lg-1 col-md-1 col-sm-1 hidden-xs"></div>
		</div><hr>
		<div class="superbusqueda row">
			<div class="col-lg-1 col-md-1 hidden-sm hidden-xs"></div>
			<div class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
				<br if={ showCat.length > 0 }>
				<span class="des desmin">{ showCat }</span><br if={ showCat.length > 0 }>
				<span class="des desmin">{ showSubCat }</span><br if={ showSubCat.length > 0 }>
				<br if={ showCat.length > 0 }>
				<nav>
					<select onchange={ selectedfavorite } if={ favoritesshow } id="favs" class="form-control">
						<option selected>Tus Trámites Favoritos</option>
						<option each={ obj, i in getnamestrams(numbersfav) } value="{ obj.n }">{ obj.t }</option>
					</select>
					<div each={ cat, i in categorias } onclick={ changecat } data-menu="{ i }" class="option">{ cat.CategoriaNombre }<span id="badgecat{ i }" class="badge cat"></span>
						<div class="submenu">
							<div each={subcat, j in cat.subcategorias } onclick={ changesubcat } class="">{ subcat.SubCategoriaNombre }<span id="badgecat{ i }_{ j }" class="badge sub"></span></div>
						</div>
					</div>
				</nav>
				<button type="button" class="btn btn-default btn-md btn-block" onclick="javascript:window.open('http://servicios.hidalgo.gob.mx/tramites/gamexamplelogin.aspx','_blank')">
					<span class="glyphicon glyphicon-user"></span>
					Acceso a Usuarios RUTS</button>
			</div>
			<div class="col-lg-7 col-md-7 col-sm-9 col-xs-12">
				<main id="resultados-ruts">
					<span class="des">{ statusmove }</span>
					<div class="resultados">
						<section class="loadering"></section>
						<div class="loadering">
							<center>
								<img src="images/loader.gif">
								<h1>Filtrando los datos</h1>
							</center>
						</div>
						<div id="detallesview" class="row">
							<div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
								<div class="row">
									<center>
									<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
										<button onclick={ backpages } type="button" class="actions btn btn-default btn-xs btn-block">
										<span class="glyphicon glyphicon-chevron-left"></span>
										Regresar</button>
									</div>
									<div class="col-lg-6col-md-6 col-sm-6 col-xs-12">
										<button if={ favoritesshow } onclick={ savetram } type="button" class="actions btn btn-default btn-xs btn-block">
										<span class="glyphicon glyphicon-heart"></span>
										Agregar a Favoritos</button>
									</div>
									<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
										<button onclick={ imprimir } type="button" class="actions btn btn-default btn-xs btn-block">
										<span class="glyphicon glyphicon-print"></span>
										Imprimir</button>
									</div>
									</center>
								</div>
								
								<h3 rutslight>{ detalles.TramServNombre }</h3>
								<label rutslight>{ getdependence(detalles.DependenciaId) }</label>
								<span>Última actualización: <label>{ returnfecha(detalles.TramservFechaUltimaAct) }</label></span>
								<span>Clave: <label>{ getclavetramserv(detalles) }</label></span>
								<hr>
								<div class="contig">
									<h4>Descripción</h4>
									<p rutslight style="white-space: pre-wrap;">{ detalles.TramServDescripcion }</p>
								</div>
								<div class="contig">
									<h4>A quién va dirigido</h4>
									<p rutslight style="white-space: pre-wrap;">{ detalles.TramServDirigido }</p>
								</div>
								<div class="contig">
									<h4>Requisitos</h4>
									<p rutslight style="white-space: pre-wrap;">{ detalles.TramServRequisitos }</p>
								</div>
								<div class="contig">
									<h4>Comprobante a obtener</h4>
									<p style="white-space: pre-wrap;">{ detalles.TramServComprobante }</p>
								</div>
								<div class="contig">
									<h4>Vigencia</h4>
									<p style="white-space: pre-wrap;">{ detalles.TramServVigencia }</p>
								</div>
								<div class="contig">
									<h4>Tiempo de respuesta</h4>
									<p style="white-space: pre-wrap;">{ detalles.TramServTiempoRespuesta }</p>
								</div>
                                                                <div class="contig">	
									<h4>Tipo de trámite en internet</h4>
									<p style="white-space: pre-wrap;">{ typetnivel(detalles.TramServNivelId) }</p>
								</div>
								<div class="contig">
									<h4>Costo(s)</h4>
									<p style="white-space: pre-wrap;">{ detalles.TramServCosto }</p>
								</div>
								<div class="contig">
									<h4>Área de pago</h4>
									<p style="white-space: pre-wrap;">{ detalles.TramServAreaPago }</p>
								</div>
								<div class="contig" if={ ligas.length > 0 }>
									<h4>Ligas</h4>
									<p each={lig, i in ligas}><a href="{ lig.TramServLiga }" target="_blank">{ lig.TramServLigaDescripcion }</a><hr></p>
								</div>
								<div class="contig" if={ formatos.length > 0 }>
									<h4>Archivos Descargables</h4>
									<div each={form, i in formatos}>
										<h6>{ form.TramServFormatoDesc }</h6>
										<a if={ form.TramServFormatoArchivoNombre.length > 0 } onclick={ openfilew }>{ form.TramServFormatoArchivoNombre }.{ form.TramServFormatoArchivoExtensio }</a>
										<hr>
									</div>
								</div>
								<div class="contig" if={ fundamentos.length > 0 }>
									<h4>Fundamento jurídico</h4>
									<div each={fun, i in fundamentos}>
										<p style="white-space: pre-wrap;">{ fun.TramServFundamentoDescripcion }</p>
										<a href="{ fun.TramServFundamentoLiga }" target="_blank">Ver más</a>
										<hr>
									</div>
								</div>
								<div class="contig form visible-lg visible-md visible-sm hidden-xs">
									<h4>Su opinión es muy importante para nosotros, para brindarle un mejor servicio conteste:</h4>
									<label>¿Cuál es su grado de satisfacción con respecto a la información encontrada sobre el trámite/servicio?:</label>
									<input type="email" placeholder="Correo electrónico">
									<div class="radio">
									  <label>
									    <input type="radio" name="optionsRadios" value="Excelente" checked>
									    Excelente
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="optionsRadios" value="Bien">
									    Bien
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="optionsRadios" value="Regular">
									    Regular
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="optionsRadios" value="Mal">
									    Mal
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="optionsRadios" value="Pésimo">
									    Pésimo
									  </label>
									</div>
									<button onclick={ sendform } type="button" class="btn btn-default btn-lg btn-block">Enviar</button>
								</div>
							</div>
							<div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 contact">
								<div class="contig" if={ atencionarr.length > 1 }>
									<h4>Selecciona una ubicación</h4>
									<select onchange={ changelugar }>
										<option each={lugar, i in atencionarr} value="{ i }">{ lugar.TramServAtencionNombre }</option>
									</select>
									<hr>
								</div>
								<iframe width="100%" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q={ detalles.atencion.TramServAtencionLatitud },{ detalles.atencion.TramServAtencionLongitud }&hl=es;z=14&amp;output=embed" if={ detalles.atencion.TramServAtencionLatitud }></iframe>
								<div class="contig" if={ detalles.atencion.TramServAtencionDireccion.length > 0 }>
									<h4>Dirección</h4>
									<p>{ detalles.atencion.TramServAtencionDireccion }</p>
									<hr>
								</div>
								<div class="contig" if={ detalles.atencion.TramServAtencionHorarioAtencio.length > 0 }>
									<h4>Horarios</h4>
									<p>{ detalles.atencion.TramServAtencionHorarioAtencio }</p>
									<hr>
								</div>
								<div class="contig" if={ detalles.atencion.TramServAtencionTelefonos.length > 0 }>
									<h4>Teléfono</h4>
									<p>{ detalles.atencion.TramServAtencionTelefonos }</p>
									<hr>
								</div>
								<div class="contig" if={ detalles.atencion.TramServAtencionCorreo.length > 0 }>
									<h4>Correo electrónico</h4>
									<p>{ detalles.atencion.TramServAtencionCorreo }</p>
									<hr>
								</div>
								<div class="contig">
									<h4>Responsable del trámite</h4>
									<p>{ detalles.TramServResponsableNombre } { detalles.TramServResponsablePaterno } { detalles.TramServResponsableMaterno }</p>
									<p>{ detalles.TramServResponsableCargo }</p>
									<p>{ detalles.TramServResponsableTelefono }</p>
									<p>{ detalles.TramServResponsableCorreo }</p>
								</div><hr>
								<div class="form" if={ detalles.atencion.TramServAtencionCorreo.length > 0 }>
									<h4>Contacta al responsable del trámite</h4>
									<input id="nombre" placeholder="Nombre">
									<input id="email" placeholder="Correo electrónico">
									<input id="phone" placeholder="Teléfono">
									<input id="emailsend" style="display:none" value="{ detalles.TramServResponsableCorreo }">
									<textarea id="coments" placeholder="Comentarios"></textarea>
									<button type="button" onclick="javascript:sendBuzon()" class="btn btn-default btn-lg btn-block">Enviar</button>
								</div>
							</div>
						</div>
						<div each={ trams, i in filtro } class="respage page{i}" if={ detectfil(trams.TramServLigaLines, trams.TramServStatus) } show={ loadering }>
							<div class="res">
								<h3 onclick={ selecttramite } ide="{ trams._id }" rutslight>{ trams.TramServNombre }</h3>
								<label rutslight>{ trams.DependenciaIdNombre }</label>
								<p rutslight>{ trams.TramServDescripcionCorta }</p>
							</div>
							<hr>
						</div>
					</div>
				</main>
			</div>
			<div class="col-lg-1 col-md-1 hidden-sm hidden-xs"></div>
		</div>
	</div>
	<div id="editor"></div>
	</center>
	<style>
		code{
			padding: 0px !important;
			display: inline-block !important;
			margin: 0px !important;
		}

		button.search{
			height: 67px;
		    border-radius: 0px;
		    border-top: 0px;
		    border-bottom: 0px;
		}

		button.actions{
			font-size: 12px !important;
			border-color: transparent !important;
			text-align: center;
		}

		button.actions *{
			display: inline-block !important;
		}

		button.actions span{
			margin-right: 3px;
			font-size: 12px;
		}

		#detallesview{
			margin-top: -20px;
		}

		.desmin{
			font-size: 12px;
		}
	</style>
	<script>
		var self = this;
		self.filtro = [];
		self.tagsfil = [];
		self.tagssearch = [];

		self.statusmove = "Resultados de la búsqueda";

		self.loadering = true;

		self.detalles = {};

		self.filpath = 0;

		selectedfavorite(e){
			var val = Number($("select#favs").val());
			for (var i = 0; i < self.tramserv.length; i++) {
				var id = self.tramserv[i]["TramServId"];
				if (Number(val) == id) {
					var obj = {item:{trams:self.tramserv[i]}};
					self.selecttramite(obj);
				};
			};
		}

		savetram(e){
			var id = self.detalles["TramServId"];
			if (localStorage["fav"] != undefined) {
				var favs = localStorage["fav"];
				favs = favs.split(",");
				var checke = true;
				for (var i = 0; i < favs.length; i++) {
					var n = favs[i];
					if (Number(n) == id) {
						checke = false;
					};
				};

				if (checke) {
					favs.push(id);
					self.numbersfav = favs;
					localStorage.setItem("fav",favs);
					self.update();
				};
			}else{
				localStorage.setItem("fav",String(id));
				self.numbersfav = [id];
				self.update();
			}
		}

		getnamestrams(arr){
			//self.numbersfav
			var names = [];
			for (var i = 0; i < arr.length; i++) {
				var num = arr[i];
				for (var j = 0; j < self.tramserv.length; j++) {
					var id = self.tramserv[j]["TramServId"];
					if (Number(num) == id) {
						var obj = {n:id,t:self.tramserv[j]["TramServNombre"]};
						names.push(obj);
					};
				};
			};
			
			return names;
		}

		triggersearch(e){
			var e = jQuery.Event("keypress");
			e.which = 13; //choose the one you want
			e.keyCode = 13;
			$('input[placeholder="¿Qué estás buscando? (Presiona \'ENTER\' para comenzar a filtrar)"]').trigger(e);
		}

		function replaceHTML(html,text) {
			var index = html.indexOf(text);
		    if ( index >= 0 ){ 
		        html = html.substring(0,index) + "<code>" + html.substring(index,index+text.length) + "</code>" + html.substring(index + text.length);
		    }

		    return html;
		}

		this.on("update",function() {
			actualicenumbers();
		});

		function actualicetexts() {
			$('.respage [rutslight]').each(function(i, item) {
				var e = $(this);
				e.html(e.text());
				var h = e.html();
				for (var i = 0; i < self.tagsfil.length; i++) {
					var tag = self.tagsfil[i];
					h = replaceHTML(h,tag);
				};

				for (var i = 0; i < self.tagssearch.length; i++) {
					var tag = self.tagssearch[i];
					var quitspals = [" a "," ante "," bajo "," cabe "," con "," contra "," de "," esta "," donde "," desde "," durante "," en "," entre "," hacia "," hasta "," mediante "," para "," por "," segun "," sin "," sobre "," tras "," versus "," via "," la "," del "," el "];
					for (var j = 0; j < quitspals.length; j++) {
						tag = tag.split(quitspals[j]).join(" ");
					};
					tag = tag.split("  ").join(" ");
					tag = tag.split(" ");
					for (var j = 0; j < tag.length; j++) {
						var palabra = tag[j];
						h = replaceHTML(h,palabra);
					};
				};
				e.html(h);
			});
		};

		function validateEmail($email) {
		  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		  return emailReg.test( $email );
		}

		sendform(e){
			var cal = $('input[name="optionsRadios"]:checked').val();
			var email = $("input[type='email']").val();
			var hora = String(new Date());
			if (validateEmail(email)) {
				$("input[type='email']").val("");
				alert("GRACIAS POR TU COLABORACIÓN !!!");
			}else{
				alert("Correo electrónico inválido");
			}
		}

		changelugar(e){
			self.detalles.atencion = self.atencionarr[Number(e.target.value)];
		}

		imprimir(){
			var popupWin = window.open("","_blank");
			popupWin.window.focus();
			popupWin.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="http://www.hidalgo.gob.mx:8181/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="http://www.hidalgo.gob.mx:8181/css/ruts.css"></head><body>');
			popupWin.document.write($("#detallesview").html());
			$(popupWin.document).find("button").hide();
			$(popupWin.document).find(".form").hide();
			setTimeout(function() {
				popupWin.window.print();
				popupWin.window.close();
			},2000);
		}

		typetnivel(text){
			var res = "";
			switch(text){
				case 1:
				res = "Indefinido";
				break;
				case 2:
				res = "Informativo";
				break;
				case 3:
				res = "De inicio";
				break;
				case 4:
				res = "Transaccional"
				break;
			}

			return res;
		}

		returnfecha(text){
			var d = new Date(text);
			var curr_date = d.getDate();
		    var curr_month = d.getMonth() + 1;
		    var curr_year = d.getFullYear();
		    return curr_date + "-" + curr_month + "-" + curr_year;
		}

		function b64toBlob(b64Data, contentType, sliceSize) {
		  contentType = contentType || '';
		  sliceSize = sliceSize || 512;

		  var byteCharacters = atob(b64Data);
		  var byteArrays = [];

		  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		    var slice = byteCharacters.slice(offset, offset + sliceSize);

		    var byteNumbers = new Array(slice.length);
		    for (var i = 0; i < slice.length; i++) {
		      byteNumbers[i] = slice.charCodeAt(i);
		    }

		    var byteArray = new Uint8Array(byteNumbers);

		    byteArrays.push(byteArray);
		  }

		  var blob = new Blob(byteArrays, {type: contentType});
		  return blob;
		}

		openfilew(e){
			var typesform = {"doc":"application/msword",
			"dot":"application/msword",
			"docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"dotx":"application/vnd.openxmlformats-officedocument.wordprocessingml.template",
			"docm":"application/vnd.ms-word.document.macroEnabled.12",
			"dotm":"application/vnd.ms-word.template.macroEnabled.12",
			"xls":"application/vnd.ms-excel",
			"xlt":"application/vnd.ms-excel",
			"xla":"application/vnd.ms-excel",
			"xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"xltx":"application/vnd.openxmlformats-officedocument.spreadsheetml.template",
			"xlsm":"application/vnd.ms-excel.sheet.macroEnabled.12",
			"xltm":"application/vnd.ms-excel.template.macroEnabled.12",
			"xlam":"application/vnd.ms-excel.addin.macroEnabled.12",
			"xlsb":"application/vnd.ms-excel.sheet.binary.macroEnabled.12",
			"ppt":"application/vnd.ms-powerpoint",
			"pot":"application/vnd.ms-powerpoint",
			"pps":"application/vnd.ms-powerpoint",
			"ppa":"application/vnd.ms-powerpoint",
			"pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",
			"potx":"application/vnd.openxmlformats-officedocument.presentationml.template",
			"ppsx":"application/vnd.openxmlformats-officedocument.presentationml.slideshow",
			"ppam":"application/vnd.ms-powerpoint.addin.macroEnabled.12",
			"pptm":"application/vnd.ms-powerpoint.presentation.macroEnabled.12",
			"potm":"application/vnd.ms-powerpoint.template.macroEnabled.12",
			"ppsm":"application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
			"pdf":"application/pdf"};
			var base = e.item.form.TramServFormatoArchivo;
			var type = e.item.form.TramServFormatoArchivoExtensio;
			var blob = b64toBlob(base, typesform[type]);
			var blobUrl = URL.createObjectURL(blob);
			window.open(blobUrl,"_blank");
		}

		backpages(e){
			self.statusmove = "Resultados de la búsqueda";
			self.loadering = true;
			self.detalles = {};
			$("#website div.superbusqueda main#resultados-ruts div#detallesview").hide();

			$('html, body').animate({
                scrollTop: 0
            }, 1000);
		}

		selecttramite(e){
			self.detalles = {};
			self.formatos = [];
			self.fundamentos = [];
			self.ligas = [];
			self.nivel = [];
			self.detalles = e.item.trams;
			self.detalles["atencion"] = {};
			self.detalles["nivel"] = {};
			var idtram = self.detalles["TramServId"];
			console.log(idtram);
			socket.emit("getDetalles",{id:idtram});
			self.atencionarr = [];
			for (var i = 0; i < self.atencion.length; i++) {
				var atenId = self.atencion[i]["TramServId"];
				if (atenId == self.detalles["TramServId"]) {
					self.atencionarr.push(self.atencion[i]);
				};
			};

			if (self.atencionarr.length > 0) {
				self.detalles["atencion"] = self.atencionarr[0];
			};

			console.log(self.detalles);

			self.loadering = false;
			$("#website div.superbusqueda main#resultados-ruts div#detallesview").show();

			self.statusmove = "";

			$('html, body').animate({
                scrollTop: 96
            }, 1000);

			self.update();
			actualicetexts();
		}

		startLoadering(){
			self.statusmove = "Buscando...";
			self.loadering = false;
			$("#website div.superbusqueda main#resultados-ruts div.loadering").show();
			$("#website div.superbusqueda main#resultados-ruts section.loadering").show();
		}

		stopLoadering(){
			self.loadering = true;
			$("#website div.superbusqueda main#resultados-ruts div.loadering").hide();
			$("#website div.superbusqueda main#resultados-ruts section.loadering").hide();
		}

		selectall(){
			self.showCat = "";
			self.showSubCat = "";

			$("button#todos").addClass("selected");
			$("div.superbusqueda nav div.option").each(function(i, item) {
				$(this).removeClass("selected");
			});
			self.filtro = self.tramserv;
			self.cat = null;
			self.pos = null;

			refreshdata();
		}

		getdependence(n){
			for (var i = 0; i < self.dependencias.length; i++) {
				var dep = self.dependencias[i];
				if (dep["DependenciaId"] == n) {
					return dep["DependenciaNombre"];
				}
			};
			return "Sin dependencia";
		}

		getclavetramserv(tram){
			var n = tram["DependenciaId"];
			var z = tram["TramServClaveP2"];
			var dependencia = "";
			var nsec = 0;
			var secretaria = "";
			for (var i = 0; i < self.dependencias.length; i++) {
				var dep = self.dependencias[i];
				if (dep["DependenciaId"] == n) {
					dependencia = dep["DependenciaSiglas"];
					nsec = dep["SecretariaId"];
				}
			};

			for (var i = 0; i < self.secretarias.length; i++) {
				var sec = self.secretarias[i];
				if (sec["SecretariaId"] == nsec) {
					secretaria = sec["SecretariaSiglas"];
				}
			};

			return secretaria+"/"+dependencia+"/"+z;
		}

		function refreshdata(){
			self.loadering = true;
			$('html, body').animate({
                scrollTop: 0
            }, 0);
			$("#website div.superbusqueda main#resultados-ruts div#detallesview").hide();

			

			if (self.tagsfil.length > 0 || self.tagssearch.length > 0) {
				$("input").blur(); 
				self.startLoadering();
				var selfy = {
					categorias:self.categorias,
					subcategorias:self.subcategorias,
					filtro:self.filtro,
					tagsfil:self.tagsfil,
					tagssearch:self.tagssearch,
					cat:self.cat,
					pos:self.pos,
					dependencias:self.dependencias
				}
				socket.emit('search', selfy);

			}else{
				var newdata = [];
				self.filtro = [];
				if (self.cat != null && self.pos != null) {
					newdata = self.categorias[self.cat].subcategorias[self.pos]["resultsarr"];
				}else{
					newdata = self.tramserv;
				}

				for (var i = 0; i < newdata.length; i++) {
					newdata[i]["TramServLigaLines"] = Number(newdata[i]["TramServLigaLines"]);
					delete newdata[i]["coins"];
					if (i == newdata.length-1) {
						//self.statusmove = "Resultados de la búsqueda";
						setTimeout(function() {
							self.filtro = newdata;
							self.statusmove = "Resultados de la búsqueda";
							self.filpath++;
							self.update();
							setTimeout(function() {
								actualicenumbers();
							},1000);
						});
					};
				};

				
			}
		}

		self.datadetalles = {};
		socket.on('setDetalles', function(data) {
			console.log(data);
			self.datadetalles[data.name] = data.data;
	    });

	    socket.on('finishDetalles', function(data) {
			console.log(self.datadetalles);
			self.formatos = self.datadetalles.formato;
			self.fundamentos = self.datadetalles.fundamento;
			self.ligas = self.datadetalles.liga;
			self.nivel = self.datadetalles.nivel;
			self.update();
	    });

		socket.on('finish-seach', function(data) {
			console.log("OK");
			self.categorias = data.categorias;
			self.subcategorias = data.subcategorias;
			self.filtro = data.filtro;
			//self.tagsfil = data.tagsfil;
			//self.tagssearch = data.tagssearch;
			//self.cat = data.cat;
			//self.pos = data.pos;
			//self.dependencias = data.dependencias;

	        self.stopLoadering();
			self.update();

			if ($("div.respage").length == 0) {
				self.statusmove = "No se encontraron resultados";
			}else{
				self.statusmove = "Resultados de la búsqueda";
			}

			self.update();

			$("div.superbusqueda nav div.option").each(function(i, item) {
				if (i == self.cat) {
					$(this).addClass("selected");
				} else{
					$(this).removeClass("selected");
				};
			});

			$($("div.superbusqueda nav div.option")[self.cat]).find("div.submenu div").each(function(i, item) {
				if (i == self.pos) {
					$(this).addClass("selected");
				} else{
					$(this).removeClass("selected");
				};
			});

			actualicetexts();
			console.log("FILTRO",self.filtro);
	    });

		detectfil(n,l){
			if (l == "P") {
				if (typeof n == 'number') {
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}

		busquedainput(e){
			var select = $(e.currentTarget);
			self.tagssearch = [];
			if (select.find("option:selected").length > 0) {
				select.find("option:selected").each(function(i, item) {
					var palabra = $(this).text();
					if ((self.tagssearch).indexOf(palabra) == -1) {
						self.tagssearch.push(palabra);
					}
					console.log(self.tagssearch);
					refreshdata();
				});
				$("#visita").remove();
			}else{
				refreshdata();
			}

			var h = $("nav#header").height();
			$("div#website").css("padding-top",h+"px");
			$("button.search").css("height",h+"px");
		}

		calculateresults(i){
			var count = 0;
			var submenu = $($("div.submenu")[i]);
			var badges = submenu.find("span.badge");
			for (var i = 0; i < badges.length; i++) {
				var inc = Number($(badges[i]).text());
				count += inc;
			};
			return count;
		}

		function actualicenumbers() {
			for (var i = 0; i < self.categorias.length; i++) {
				var sub = self.categorias[i]["subcategorias"];
				for (var j = 0; j < sub.length; j++) {
					var subcat = sub[j];
					var res = self.calculateresultssub(subcat);
					$("#badgecat"+i+"_"+j).text(res);
				};
				$("#badgecat"+i).text(self.calculateresults(i));
			};
		};

		calculateresultssub(subcat){
			try{
				var count = 0;
				var alltext = $("div.res h3");
				var arr = subcat.resultsarr;
				for (var i = 0; i < arr.length; i++) {
					var nombre = arr[i]["_id"];
					for (var j = 0; j < alltext.length; j++) {
						var name = $(alltext[j]).attr("ide");
						if (String(nombre) == String(name)) {
							count++;
						};
					};
				};
				return count;
			}catch(w){}
			return 0;
		}

		deletetag(e){
			var item = e.item.i;
			var contend = self.tagsfil[item];
			console.log(contend.t);
			$("select#ruts-dependencias option[value='"+(contend.t)+"']").removeAttr("selected");
			self.tagsfil.splice(item, 1);
			refreshdata();
		}

		changetags(e){
			var text = $(e.path[0]).text();
			var classe = $(e.path[0]).attr('class');
			var obj = {t:text,c:classe};
			var checkexist = true;
			for (var i = 0; i < self.tagsfil.length; i++) {
				var tag = self.tagsfil[i].t;
				if (tag == text) {
					checkexist = false;
				}
			};
			console.log(obj);
			if (checkexist) {
				self.tagsfil.push(obj);
				refreshdata();
			}
		}

		reduce(text, n){
			text = text.split("*").join("");
			return (text.substring(0, n))+"...";
		}

		changecat(e){
			e.stopPropagation();
			self.cat = e.item.i;
			console.log(e.item);
			self.showCat = "Categoría: "+(e.item.cat.CategoriaNombre);
			self.showSubCat = "";
			try{
				self.filtro = [];
				var subni = self.categorias[self.cat].subcategorias;
				for (var i = 0; i < subni.length; i++) {
					try{
						self.filtro = (self.filtro).concat(subni[i]["resultsarr"]);
					}catch(e){}
				};
			}catch(e){}

			$("div.superbusqueda nav div.option").each(function(i, item) {
				if (i == self.cat) {
					$(this).addClass("selected");
				} else{
					$(this).removeClass("selected");
				};
			});
			$("#visita h1").text("Selecciona una Sub-Categoría.");
			$("#visita p").text("Desliza el cursor y click izquierdo por encima del nombre de la sub-categoría.");
		}

		function showMask1() {
			$("nav#header div.contenido div.bootstrap-tagsinput").attr("tabindex","0");
			$("nav#header div.contenido div.bootstrap-tagsinput").focus();
			var offset1 = $($("div.bootstrap-tagsinput")[0]).offset();
			var w = $($("div.bootstrap-tagsinput")[0]).width();
			var h = 46;
			var lp1 = offset1.left;
			var top = offset1.top;
			var p1 = lp1+"px "+top+"px";
			var p2 = (lp1+w)+"px "+top+"px";
			var p3 = (lp1+w)+"px "+(top+h)+"px";
			var p4 = lp1+"px "+(top+h)+"px";

			var dataMask1 = "polygon(0% 0%, 0 100%, "+lp1+"px 100%, "+p1+", "+p2+", "+p3+", "+p4+", "+lp1+"px 100%, 100% 100%, 100% 0)";
			var param1 = "-webkit-clip-path";
			var param2 = "clip-path";
			$("#visita").css(param1,dataMask1);
			$("#visita").css(param2,dataMask1);
			$("body").height($(window).height());
			$("#visita").show();
		}

		changesubcat(e){
			e.stopPropagation();
			//self.cat = (e.item.subcat.CategoriaId)-1;
			self.showSubCat = "Sub-Categoría: "+(e.item.subcat.SubCategoriaNombre);
			console.log(e.item);
			self.pos = e.item.j;
			$("button#todos").removeClass("selected");
			$($("div.superbusqueda nav div.option")[self.cat]).find("div.submenu div").each(function(i, item) {
				if (i == self.pos) {
					$(this).addClass("selected");
				} else{
					$(this).removeClass("selected");
				};
			});
			
			//console.log(self.categorias[self.cat].subcategorias[self.pos]);
			
			try{
				self.filtro = self.categorias[self.cat].subcategorias[self.pos]["resultsarr"];
			}catch(e){}

			setTimeout(function() {
				$("#visita h1").text("Escribe lo que estas buscando");
				$("#visita p").text("Puedes escribir palabras en conjunto o separadas en cada (ENTER)");
				showMask1();
			},1000);

			refreshdata();
		}

		function saveResultsCat(done) {
			for (var i = 0; i < self.tramserv.length; i++) {
				var checkpublic = self.tramserv[i]["TramServStatus"];
			  	if (checkpublic != "P") {
			  		console.log(i);
			  		self.tramserv.splice(i, 1);
			  	};
			};
			console.log(self.tramserv);
			self.detalles = self.tramserv[0];
			Looper(self.tramserv,function(item,i,callback1) {
		  	  	var ID = item["TramServId"];
		  	  	item["DependenciaIdNombre"] = self.getdependence(item["DependenciaId"]);
		  	  	self.tramserv[i]["DependenciaIdNombre"] = self.getdependence(self.tramserv[i]["DependenciaId"]);
		  	  	item["TramServDescripcionCorta"] = self.reduce(item["TramServDescripcion"], 330);
		  	  	self.tramserv[i]["TramServDescripcionCorta"] = self.reduce(self.tramserv[i]["TramServDescripcion"], 330);
		  	  	var cat = 0;
		  	  	var sub = 0;

		  	  	for (var i = 0; i < self.enlaces.length; i++) {
		  	  		var enlace = self.enlaces[i];
		  	  		var IDenlace = enlace["TramServId"];
				  	if (IDenlace == ID) {
				  	  	cat = Number(enlace["CategoriaId"])-1 < 0 ? 0 : Number(enlace["CategoriaId"])-1;
				  	  	sub = Number(enlace["SubCategoriaId"])-1 < 0 ? 0 : Number(enlace["SubCategoriaId"])-1;

				  	  	var checkexistres = false;
				  		for (key in self.categorias[cat].subcategorias[sub]) {
				  			if(key == "resultsarr") {
				  				checkexistres = true;
				  			};
				  		};
				  		var pathl = self.categorias[cat].subcategorias.length;
				  		if (pathl > sub) {
				  			var path = self.categorias[cat].subcategorias[sub];
					  		console.log(self.categorias[cat], sub);

					  		if (!checkexistres) {
								path["resultsarr"] = [];
							}
							(path["resultsarr"]).push(item);
							path["results"] = (path["resultsarr"]).length;
				  		};
				  		
				  	}

				  	if(i == self.enlaces.length-1){
				  		callback1();
				  	}
		  	  	};
			},function() {
				console.log("finish");
			  	done();
			});
		}

		function showMask() {
			var offset1 = $($("div.superbusqueda nav")[0]).offset();
			var w = $($("div.superbusqueda nav")[0]).width();
			var h = $($("div.superbusqueda nav")[0]).height();
			var lp1 = offset1.left;
			var top = offset1.top;
			var p1 = lp1+"px "+top+"px";
			var p2 = (lp1+w)+"px "+top+"px";
			var p3 = (lp1+w)+"px "+(top+h)+"px";
			var p4 = lp1+"px "+(top+h)+"px";

			var dataMask1 = "polygon(0% 0%, 0 100%, "+lp1+"px 100%, "+p1+", "+p2+", "+p3+", "+p4+", "+lp1+"px 100%, 100% 100%, 100% 0)";
			var param1 = "-webkit-clip-path";
			var param2 = "clip-path";
			$("#visita").css(param1,dataMask1);
			$("#visita").css(param2,dataMask1);
			$("body").height($(window).height());
			$("#visita").show();
		}

		var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    	var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    	var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    	var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    	var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

    	console.log("NAVIGATOR C,E,F,S,O",is_chrome,is_explorer,is_firefox,is_safari,is_opera);

    	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			localStorage.setItem("record","record");
		}

		self.checkentry = 0;

		function finishRuts() {
			self.filtro = self.tramserv;

			self.update();
			if (self.checkentry == 0) {
			    $.getScript( "js/bootstrap-tagsinput.js" ).done(function( script, textStatus ) {
				    console.log( textStatus );
				    $("#loader").hide();
				    StartxRuts();


					var tram = getUrlParameter("tram");
					if (tram) {
						console.log(tram);
						$('input[placeholder="¿Qué estás buscando? (Presiona \'ENTER\' para comenzar a filtrar)"]').val(tram);
						var e = jQuery.Event("keypress");
						e.which = 13; //choose the one you want
						e.keyCode = 13;
						$('input[placeholder="¿Qué estás buscando? (Presiona \'ENTER\' para comenzar a filtrar)"]').trigger(e);
					};

					if (localStorage["record"] == undefined) {
						localStorage.setItem("record","record");
						if (is_chrome) {
							showMask();
						}
					}else{
						$("#visita").remove();
					}

					self.update();
					self.checkentry = 1;
				});
				console.log(self.dependencias);
				console.log(self.categorias);
				console.log(self.tramserv);
			};
		}

		function checkDataResponse(check,callback) {
			var data = JSON.parse(check);
			if (data.err) {
				console.log(data);
				$("#loader h3").text("Ocurrio un error");
				$("#loader button").show();
				$("#loader button").click(function() {
					Ruts.GetData();
					$("#loader h3").text("Re-intentando");
					$("#loader button").hide();
				});
			} else{
				callback(data);
			};
		}

		Ruts.GetData = function() {
			console.log(opts);
			self.secretarias = opts.secretaria;
			self.dependencias = opts.dependencia;
			self.atencion = opts.atencion;
			self.categorias = opts.categoria;
			self.subcategorias = opts.subcategoria;
			self.enlaces = opts.tramservcategoria;
			self.fundamento = opts.fundamento;
			//self.formato = opts.formato;
			//self.liga = opts.liga;
			self.nivel = opts.nivel;
			self.tramserv = opts.tramserv;
			self.dependenciasshow = [];

			for (var i = 0; i < self.tramserv.length; i++) {
				var checkpublic = self.tramserv[i]["TramServStatus"];
			  	if (checkpublic != "P") {
			  		console.log(i);
			  		self.tramserv.splice(i, 1);
			  	};
			};

			self.tramserv = self.tramserv.sort(function(a, b) {
			    var textA = a.TramServNombre.toUpperCase();
			    var textB = b.TramServNombre.toUpperCase();
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});

			self.secretarias = self.secretarias.sort(function(a, b) {
			    var textA = a.SecretariaNombre.toUpperCase();
			    var textB = b.SecretariaNombre.toUpperCase();
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});

			self.dependencias = self.dependencias.sort(function(a, b) {
			    var textA = a.DependenciaNombre.toUpperCase();
			    var textB = b.DependenciaNombre.toUpperCase();
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});

			for (var i = 0; i < self.secretarias.length; i++) {
				var id = self.secretarias[i]["SecretariaId"];
				var obj = {nombre:self.secretarias[i]["SecretariaNombre"],h:"yes"};
				self.dependenciasshow.push(obj);
				for (var j = 0; j < self.dependencias.length; j++) {
					var secID = self.dependencias[j]["SecretariaId"];
					if (id == secID) {
						var depname = {nombre:self.dependencias[j]["DependenciaNombre"],h:"no"};
						if (depname.nombre != obj.nombre) {
							self.dependenciasshow.push(depname);
						};
					};
				};
			};

			Looper(self.subcategorias,function(item,i,callback) {
		  	  	self.subcategorias[i]["results"] = 0;
			  	var cat = Number(item["CategoriaId"])-1;
			  	var checkexistres = false;
	  			for (key in self.categorias[cat]) {
	  				if(key == "subcategorias") {
	  					checkexistres = true;
	  				};
	  			};
			  	if (!checkexistres){
			  		self.categorias[cat]["subcategorias"] = [];
			  	}
			  	self.categorias[cat]["subcategorias"].push(item);

			  	callback();
			},function() {
				console.log("save");
				saveResultsCat(function() {
					finishRuts();
				});
			});
		}

		Ruts.GetData();


		function lsTest(){
		    var test = 'test';
		    try {
		        localStorage.setItem(test, test);
		        localStorage.removeItem(test);
		        return true;
		    } catch(e) {
		        return false;
		    }
		}

		self.favoritesshow = lsTest();

		if (self.favoritesshow) {
			var arrfav = "";
			try{
				if (localStorage["fav"] != undefined) {
					arrfav = localStorage["fav"];
				};
			}catch(e){
				localStorage.setItem("fav","");
			}
			self.numbersfav = arrfav.split(",");
		};

		//delete console.log;
		
	</script>
</ruts>
