	var sumafa=0
	var sumaaci=0
	var res=0
	var nota=0
	var acireal=0
	var toaci=0
	var tofa=0
    function resbien(form,res)
{
		sumaaci=sumaaci+1;
		toaci=toaci+1;
		form.value=toaci;	
		return true
    }

    function resmal(form,res)
{
		sumafa=sumafa+1;
		tofa=tofa+1;
		form.value=tofa;
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

		if (res <=0)
		{
		alert("You can start this exercise. Good luck!")
    		}
    		else
		if (nota >=9)
		{
		alert("You have had  "+sumaaci+"  correct answers  and  "+sumafa+"   mistakes. Very good. Excellent \n \nThe mark is  "+nota+"  points. OUTSTANDING  ")
    		}
    		else
    		if (nota >=7)
    		{
		alert("You have had  "+sumaaci+"  correct answers  and   "+sumafa+"  mistakes. You can improve. \n \nThe mark is  "+nota+"  points. PROMINENT  ")    		
		}
            else            
            if (nota >=6)
    		{
		alert("You have had  "+sumaaci+"  correct answers  and  "+sumafa+"  mistakes. You should improve a lot. \n \nThe mark is  "+nota+"  points. GOOD  ")    		
		}
		else
            if (nota >=5)
    		{
		alert("you have had  "+sumaaci+"  correct answers  and  "+sumafa+"  mistakes. You have to try harder. \n \nThe mark is  "+nota+"  points. ENOUGH  ")    		
		}
		else
            if (nota >=3)
    		{
		alert("You have had  "+sumaaci+"  correct answers  and   "+sumafa+"  mistakes. You shoult repeat the exercise. \n \nThe mark is  "+nota+"  points. INSUFFICIENT  ")    		
		}
		else
		{
		alert("You have had  "+sumaaci+"  correct answers  and   "+sumafa+"   mistakes. You pay more interest. \n \nThe mark is  "+nota+"  points. VERY POOR  ")
		}
		sumaaci=0
		sumafa=0
		}
