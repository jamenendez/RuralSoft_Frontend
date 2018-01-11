	var sumafa=0
	var sumaaci=0
	var res=0
	var nota=0
	    function resbien(sumafa2)
{
		sumaaci=sumaaci+1;		
		return true
    }

    function resmal(sumafa2)
{
		sumafa=sumafa+1;		
		return true
    }
    function averiguarNota(nota2){
		res=sumaaci+sumafa
		res=res/10
		nota=sumaaci/res
		if (res <=0)
		{
		alert("Puedes empezar este ejercicio.   ¡Suerte!")
    		}
    		else
		if (nota >=10)
		{
		alert("Has tenido  "+sumaaci+"  aciertos  y  "+sumafa+"   errores.     Muy Bien. Magnífico")
    		}
    		else
    		if (nota >7)
    		{
		alert("Has tenido  "+sumaaci+"  aciertos  y   "+sumafa+"  errores.     Bien, pero puedes mejorar.")    		
		}
		else
		{
		alert("Has tenido   "+sumaaci+"  aciertos  y   "+sumafa+"   errores.     Debes repetir el ejercicio.")
		}
		sumaaci=0
		sumafa=0		}

function jRoute_onChange(form_elem) {

  nav_name = navigator.appName;

  if (nav_name != "Netscape") { new_page = eval("document.selections." + form_elem + ".value"); }

else { optionIndex = eval("document.selections." + form_elem + ".selectedIndex"); 

    new_page = eval("document.selections." + form_elem + ".options[" + optionIndex + "].value"); }

  if (new_page != "0") { window.location = new_page; return true; }

  return false; }
