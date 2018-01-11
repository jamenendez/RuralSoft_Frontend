<menugob>
    <aside id="menufloater">
    	<div class="row" if={ textsearch.length > 0 }>
    		<section class="col-md-1 col-sm-1" style="background:transparent"></section>
    		<section class="col-md-11 col-sm-11 ruts">
    			<h6>Buscar "{ textsearch }" en <a onclick={ nuevosearchtramserv } >Nuevo Trámites y Servicios Estatales</a></h6>
    		</section>
    	</div>
    	<div class="row">
		<img class="close" src="http://www.hidalgo.gob.mx/images/cerrar.png">
		<div class="col-md-1 col-sm-1 nuller"></div>
		<div>
			<div class="col-md-3 col-sm-3 selectors bar">
				<button class="gob selected">{ opts.menu[0].cat }</button>
				<button class="tra">{ opts.menu[1].cat }</button>
				<button class="tur">{ opts.menu[2].cat }</button>
				<button class="es">{ opts.menu[3].cat }</button>
				<button class="li">{ opts.menu[4].cat }</button>
				<div class="bottom">
					<button onclick="openp('http://familia.hidalgo.gob.mx/')" class="fam">Familia</button>
					<button onclick="openp('http://salud.hidalgo.gob.mx/')" class="sal">Salud</button>
					<button onclick="openp('http://cultura.hidalgo.gob.mx/')" class="cul">Cultura</button>
				</div>
			</div>
			<div class="col-md-3 col-sm-3 bar links gob2">
				<a each={ link, i in opts.menu[0].data } onclick={ clicklink } if={ link.status == "yes" }>{ link.nombre }</a>
			</div>
			<div style="display:none" class="col-md-3 col-sm-3 bar links tra2">
				<a each={ link, i in opts.menu[1].data } onclick={ clicklink } if={ link.status == "yes" }>{ link.nombre }</a>
			</div>
			<div style="display:none;" class="col-md-3 col-sm-3 bar links tur2">
				<a each={ link, i in opts.menu[2].data } onclick={ clicklink } if={ link.status == "yes" }>{ link.nombre }</a>
			</div>
			<div style="display:none;" class="col-md-3 col-sm-3 bar links es2">
				<a each={ link, i in opts.menu[3].data } onclick={ clicklink } if={ link.status == "yes" }>{ link.nombre }</a>
			</div>
			<div style="display:none;" class="col-md-3 col-sm-3 bar links li2">
				<a each={ link, i in opts.menu[4].data } onclick={ clicklink } if={ link.status == "yes" }>{ link.nombre }</a>
			</div>
			<div class="col-md-5 col-sm-5 bar linkstatic">
				<div class="table">
					<h3>Secretarías</h3><hr>
					<a each={ link, i in opts.static[0].data } onclick={ clicklink }>{ link.nombre }</a>
					<hr><h3>Herramientas</h3><hr>
					<a each={ link, i in opts.static[1].data } onclick={ clicklink }>{ link.nombre }</a>
				</div>
			</div>
		</div>
		</div>
	</aside>
	<script>
	    var self = this;
	    clicklink(e){
	        var url = e.item.link.url;
	        //if (url != "http://www.plataformadetransparencia.org.mx/") {
	        	var org = document.location.origin;
		        if (url.indexOf("webpage") > -1) {
		            url = url.split("%webpage%").join("");
		            url = org+"/"+url;
		            window.location.href = url;
		        }else{
		            window.open(url,"_blank");
		        }
	        //}else{
	        //	$("#leyenda").show();
	        //}
	    }
	    
	    nuevosearchtramserv(e){
	    	window.open("http://www.hidalgo.gob.mx:8181/?tram="+(self.textsearch),"_blank");
	    }
	    
	    datalinksservice.actualize = function(){
	    	opts = datalinksservice.datalinks;
	    	self.update();
	    }
	    
	    this.on('mount', function() {
            $("#menufloater .selectors button").on("click", function(){
                var a = $(this);
                var clase = a.attr("class");
                if(!(a.hasClass("fam") || a.hasClass("cul") || a.hasClass("sal") || a.hasClass("selected"))){
                    $(".selected").removeClass("selected");
                    a.toggleClass("selected");
                    $(".links").hide(0, function(){
                        $("."+clase+"2").show(0);
                    });
                }
                
            });
            $("input.searchinput[data='0']").bind('input change paste keyup mouseup',function(i, item) {
				var text = $(this).val();
				self.textsearch = text;
			});
			
			$("input.searchinput[data='1']").bind('input change paste keyup mouseup',function(i, item) {
				var text = $(this).val();
				self.textsearch = text;
			});
			
			if(document.location.pathname != "/" || document.location.host == "www.hidalgo.gob.mx:8282"){
				Loader("img.menuwww",function() {
					$("img.menuwww").click(function(event){
						event.stopPropagation();
						var dis = $("aside#menufloater").css("display");	
						if(dis == "none"){
							$("aside#menufloater").show();
						}else{
							$("aside#menufloater").hide();	
						}
					});

					if (document.location.host == "www.hidalgo.gob.mx:8282") {
						$("#menufloater").css("right","0px","important");
						$("nav div.links").html("");
						$("nav div.links").append('<a href="http://www.hidalgo.gob.mx:8282/">INICIO</a>');
						$("nav div.links").append('<a href="http://www.hidalgo.gob.mx:8282/dependencias">DEPENDENCIAS Y ENTIDADES</a>');
					};
				});
				
				
				$("aside#menufloater").click(function(event) {
				    event.stopPropagation();
				});
				
				$("aside#menufloater img.close").click(function(event) {
				    event.stopPropagation();
				    $("aside#menufloater").hide();
				});
				
				$("body").click(function(){
					$("aside#menufloater").hide();
				});
			}
            Startx();
        });
        
        
	    console.log(opts.menu);
	</script>
	<style>
		.ruts{
			background: #58137D;
			color: #FFF;
		}
		
		.ruts a{
			color:#FFF;
			font-weight:bold;
		}
		.ruts a:hover{
			color:#FFF;
		}
	</style>
</menugob>