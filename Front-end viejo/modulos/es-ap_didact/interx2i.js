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
		alert("You should answer all questions.  Restart.")
    		}
    		else
		if (nota >=9)
		{
		alert("You have had  "+sumaaci+"  correct answers  and  "+sumafa+"   mistakes. Very good. Excellent \n \nYou have achieved "+nota+"  points in  the exam. OUTSTANDING  ")
    		}
    		else
    		if (nota >=7)
    		{
		alert("You have had  "+sumaaci+"  correct answers  and  "+sumafa+"  mistakes. You can improve a lot. \n \nYou have achieved  "+nota+"  points in the exam. PROMINENT  ")    		
		}
            else            
            if (nota >=6)
    		{
		alert("You have had  "+sumaaci+"  correct asnwers  and  "+sumafa+"  mistakes. You should improve a lot.  \n \nYou have achieved  "+nota+"  points in the exam. GOOD  ")    		
		}
		else
            if (nota >=5)
    		{
		alert("You have had  "+sumaaci+"  correct answers  and   "+sumafa+"  mistakes. You have to try harder. \n \nYou have achieved  "+nota+"  points in the exam. ENOUGH  ")    		
		}
		else
            if (nota >=3)
    		{
		alert("You have had  "+sumaaci+"  correct answers  and   "+sumafa+"  mistakes. You should repeat the exescise. \n \nYou have achieved  "+nota+"  points in the exam. INSUFFICIENT  ")    		
		}
            else
		{
		alert("You have had  "+sumaaci+"  correct answers  and  "+sumafa+"  mistakes. You pay more interest. \n \nYou have achieved  "+nota+"  points in the exam. VERY POOR  ")
		}
		sumaaci=0
		sumafa=0		}
