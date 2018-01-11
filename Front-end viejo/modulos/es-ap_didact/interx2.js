	var sumafa=0
	var sumaaci=0
	var res=0
	var nota=0
	var acireal=0
	    function resbien(form,res)
{
		sumaaci=sumaaci+1;	
		form.value=sumaaci;	
		return true
    }

    function resmal(form,res)
{
		sumafa=sumafa+1;	
		form.value=sumafa;	
		return true
    }
    function averiguarNota(nota2){
		res=sumaaci+sumafa
		res=res/10
		acireal=sumaaci-(sumafa/2)
		nota=acireal/res
		nota=nota.toPrecision(3);
		if (nota <=0)
		{
		nota=0
    		}
		res2=sumaaci+sumafa
		if (res2 <=29)
		{
		alert("Debes contestar a todas las preguntas.  Vuelve a comenzar.")
    		}
    		else
		if (nota >=9)
		{
		alert("Has tenido  "+sumaaci+"  aciertos  y  "+sumafa+"   errores. Muy Bien. Magnífico \n \nEn el examen has obtenido  "+nota+"  puntos. SOBRESALIENTE  ")
    		}
    		else
    		if (nota >=7)
    		{
		alert("Has tenido  "+sumaaci+"  aciertos  y   "+sumafa+"  errores. Puedes mejorar. \n \nEn el examen has obtenido  "+nota+"  puntos. NOTABLE  ")    		
		}
            else            
            if (nota >=6)
    		{
		alert("Has tenido  "+sumaaci+"  aciertos  y   "+sumafa+"  errores. Debes mejorar bastante. \n \nEn el examen has obtenido  "+nota+"  puntos. BIEN  ")    		
		}
		else
            if (nota >=5)
    		{
		alert("Has tenido  "+sumaaci+"  aciertos  y   "+sumafa+"  errores. Has de esforzarte más. \n \nEn el examen has obtenido  "+nota+"  puntos. SUFICIENTE  ")    		
		}
		else
            if (nota >=3)
    		{
		alert("Has tenido  "+sumaaci+"  aciertos  y   "+sumafa+"  errores. Debes repetir el ejercicio. \n \nEn el examen has obtenido  "+nota+"  puntos. INSUFICIENTE  ")    		
		}
            else
		{
		alert("Has tenido   "+sumaaci+"  aciertos  y   "+sumafa+"  errores. Pon más atención. Repite el ejercicio. \n \nEn el examen has obtenido  "+nota+"  puntos. MUY DEFICIENTE  ")
		}
		sumaaci=0
		sumafa=0		}
