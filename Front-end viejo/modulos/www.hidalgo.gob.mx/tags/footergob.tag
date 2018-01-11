<footergob>
    <footer class="row"  databg="join" bg="#092432">
			<div class="row">
			<div class="col-md-3 col-sm-4 contact">
				<center>
					<img class="logo" src="http://www.hidalgo.gob.mx/images/footer_logo.png">
				</center>
				<center>
					<img class="escudo" src="http://www.hidalgo.gob.mx/images/footer_escudo.png">
				</center>
				<center>
					<div>Plaza Juárez s/n, Col. Centro</div>
					<div>Pachuca de Soto, Hidalgo, México.</div>
					<div><b>(771) 717 6000</b></div>
					<div class="email">webhgo@hidalgo.gob.mx</div>
					<div>
						<img onclick="openp('https://www.facebook.com/gobhidalgo/')" class="social" src="http://www.hidalgo.gob.mx/images/fb_footer.png">
						<img onclick="openp('https://www.youtube.com/user/CCSOCIALGOBHGO')" class="social middle" src="http://www.hidalgo.gob.mx/images/yt_footer.png">
						<img onclick="openp('https://twitter.com/gobiernohidalgo')" class="social" src="http://www.hidalgo.gob.mx/images/tw_footer.png">
					</div>
				</center>
			</div>
			<div class="col-md-3 col-sm-4 middlediv">
				<div>
					<h3>{ opts.menu[0].cat }</h3>
					<a each={ link, i in opts.menu[0].data } onclick={ clicklink }>{ link.nombre }</a>
				</div>

				<div class="footerlinks">
					<h3>{ opts.menu[1].cat }</h3>
					<a each={ link, i in opts.menu[1].data } onclick={ clicklink }>{ link.nombre }</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-4 middlediv">
				<div>
					<h3>{ opts.menu[2].cat }</h3>
					<a each={ link, i in opts.menu[2].data } onclick={ clicklink }>{ link.nombre }</a>
				</div>

				<div class="footerlinks">
					<h3>{ opts.menu[3].cat }</h3>
				    <a each={ link, i in opts.menu[3].data } onclick={ clicklink }>{ link.nombre }</a>
				</div>
			</div>
			<div class="col-md-3 hidden-sm middlediv">
				<div>
					<h3>Secretarías</h3>
					<a each={ link, i in opts.static[0].data } onclick={ clicklink }>{ link.nombre }</a>
				</div>

				<div class="footerlinks">
					<h3>Herramientas</h3>
					<a each={ link, i in opts.static[1].data } onclick={ clicklink }>{ link.nombre }</a>
				</div>
			</div>
			</div>
			<div class="row">
				<div class="col-md-4 col-sm-3"></div>
				<div class="col-md-4 col-sm-6">
					<center>
						<p>© 2016 Gobierno del Estado de Hidalgo. Derechos Reservados</p>
					</center>
				</div>
				<div class="col-md-4 col-sm-3"></div>
			</div>
		</footer>
	<script>
	    
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

	    console.log(opts.menu);
	</script>
</footergob>