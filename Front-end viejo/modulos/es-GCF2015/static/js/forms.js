var maxTelephone=10;var maxCell=10;jQuery().ready(function(){var textSelect=$("#textSelect").val();var regex_textform_1=/[^A-Za-z0-9\s-_]+/gi;var regex_textform_2=/[^A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s-_]+/gi;var regex_textform_3=/[^A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s.,¡!¿?:;'"-_]+/gi;var regex_textform_4=/[^A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s,-_]+/gi;var regex_textform_5=/[^A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s,]+/gi;$(".isTextForm").bind('mouseover mouseout',function(event){getInputString(this,$(this).val(),regex_textform_3);});$(".isTextFormPyC").bind('mouseover mouseout',function(event){getInputString(this,$(this).val(),regex_textform_4);});$(".isNameForm").bind('mouseover mouseout',function(event){getInputString(this,$(this).val(),regex_textform_2);});$(".isNameABCForm").bind('mouseover mouseout',function(event){getInputString(this,$(this).val(),regex_textform_1);});$(".isCommaSeparator").bind('mouseover mouseout',function(event){getInputString(this,$(this).val(),regex_textform_5);});$(".removeData").live("click",function(e){e.preventDefault();$input=$(this);var message_delete=$input.data("messagedelete");var areYouSure=$("#areYouSure"+ message_delete).val();var classCheck=$input.data("classremovedata");var ids=getIdsChecked(classCheck);if(ids!=undefined&&ids!=""){function functionLoad(e,v,m,f){if(v!=undefined){if(v){removeData(ids,messageRemoveData);return false;}else{return true;}}}
loadPrompt(areYouSure,functionLoad,true,true,null,null);}else{loadPrompt(textSelect,null,false,false,null,null);}
e.stopImmediatePropagation();});$(".deletersrc").live("click",function(e){e.preventDefault();$input=$(this);var message_delete=$input.data("messagedelete");var areYouSure=$("#areYouSure"+ message_delete).val();var idCheckDelete=$input.data("delete");var idResource=$("#"+ idCheckDelete).val();var impromptubox=$("#impromptubox").html();if(idResource!=undefined&&idResource!=""&&impromptubox==undefined){function functionLoad(e,v,m,f){if(v!=undefined){if(v){removeData(idResource,messageRemoveData);return false;}else{return true;}}}
loadPrompt(areYouSure,functionLoad,true,true,null,null);}
e.stopImmediatePropagation();return false;});$(".jqiclose,.impromptuclose").live("click",function(){$.prompt.close();$("#impromptubox").remove();});});function isTextFormPyC(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\u00e7\u00c7\s,-_]/;te=String.fromCharCode(tecla);return patron.test(te);}
function isNameForm(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\u00e7\u00c7\s-_!¡?¿]/;te=String.fromCharCode(tecla);return patron.test(te);}
function isNameABCForm(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[A-Za-z0-9\s-_]/;te=String.fromCharCode(tecla);return patron.test(te);}
function isCommaSeparator(e,max,classInput){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;if(e.keyCode==40)
return true;var patron="";if(max==undefined||max==""){patron=/[A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\u00e7\u00c7\s,]/;}else if(classInput!=undefined){var valInput=$("."+ classInput).val();var arraySeparated=split(valInput);if(arraySeparated.length<max){patron=/[A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\u00e7\u00c7\s,]/;}else{patron=/[A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\u00e7\u00c7\s]/;}}
te=String.fromCharCode(tecla);return patron.test(te);}
function isTextForm(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[0-9A-Za-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\u00e7\u00c7\s\.\,\¡\!\¿\?\:\;\'\"-_@]/;te=String.fromCharCode(tecla);return patron.test(te);}
function getIdsChecked(classCheck){var info="";$("input[class^="+ classCheck+"]:checked").each(function(){var id=$(this).val();info+=id+",";});return info.substring(0,info.length- 1);}
function removeData(ids,functionReturn){var urlRemove=$("#urlRemove").val();if(urlRemove!=undefined){$.ajax({url:urlRemove,timeout:20000,type:"POST",data:"ids="+ ids,dataType:'json',success:function(rst){hideLoading();if(functionReturn!=null){functionReturn(rst);}},error:function(request,status,error){hideLoading();}});}}
function messageRemoveData(message){$("#impromptubox").fadeOut('fast',function(){$("#impromptubox").remove();var msg="";if(message.message==undefined){msg=message;}else{msg=message.message;}
loadPrompt(msg,null,false,false,null,null);});loadDefaultListFilter();}
function cloneInput($input,type,text){var $newInput=$input.clone().attr('type',type).val(text);$input.replaceWith($newInput);return $newInput;}
function getInputString(idContainer,content,regex_textform){var left_trimmedStr=content;var cleanedStr=left_trimmedStr.replace(regex_textform,"");$(idContainer).val(cleanedStr);}
function getInputNameString(idContainer,content){var left_trimmedStr=content;var non_alphanumerics_rExp=/[^A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s]+/gi;var cleanedStr=left_trimmedStr.replace(non_alphanumerics_rExp,"");$(idContainer).val(cleanedStr);}
function validarNUMDouble(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[1234567890.,]/;te=String.fromCharCode(tecla);return patron.test(te);}
function validarNUM(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[1234567890]/;te=String.fromCharCode(tecla);return patron.test(te);}
function validarABC(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[A-Za-z\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s]/;te=String.fromCharCode(tecla);return patron.test(te);}
function isCadena(texto,max){var reg=new RegExp("/^[\w\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s\-\]{0,"+ max+"}$/");return(reg.test(texto));}
function isEmailEvent(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8)
return true;if(tecla==0)
return true;patron=/[A-Za-z0-9\u00E1\u00E9\u00ED\u00F3\u00FA\u00C1\u00C9\u00CD\u00D3\u00DA\u00D1\u00F1\s\-\@\.\_]/;te=String.fromCharCode(tecla);return patron.test(te);}
function IsEmail(email){var regex=/^([a-zA-Z){1}])+([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;if(regex.test(email))
return true;else
return false;}
function IsURL(url){var regex=/^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;if(regex.test(url))
return true;else
return false;}
function IsNumber(number){var reg=new RegExp(/^\d+$/);return(reg.test(number));}
function isPassword(pass){var reg=new RegExp(/^\w*$/);return(reg.test(pass));}
function isCelular(number){var reg=new RegExp(/^\d{10}$/);return(reg.test(number));}
function validateMultiple(idForm)
{$(".errorReq").html("");var rta="";var contentImpromptu=$('#'+ idForm).data("impromptu");$(':input','#'+ idForm).each(function(){var valInput=validateForm($(this));if(valInput!=""){if(contentImpromptu!=undefined){rta+="\n";}else{rta+="<br/>";}}
rta+=valInput;});if(rta!="")
{if(contentImpromptu!=undefined){alert(rta);}else{loadPrompt(rta,null,false,false,null,null);}
enablePlaceHolder();return false;}else{$(':input','#'+ idForm).each(function(){$input=$(this);if($input.data('placeholder')!=undefined&&$input.data('placeholder')!=""&&htmlDecode($input.val())==htmlDecode($input.data('placeholder'))){$input.val('');}});return true;}}
function getWordsCount(words){var array=split(words);return array.length;}
function firstUpperCase(string){return string.charAt(0).toUpperCase()+ string.slice(1);}
function clearForm(idForm){$('#'+ idForm).find(':input').each(function(){$input=$(this);var type=$input.attr("type");if(type=='text'||type=='password'||type=='textarea'||type=='hidden')
$input.val("");else if(type=='checkbox'||type=='radio')
$input.checked=false;});}
function ltrim(str,chars){chars=chars||"\\s";return str.replace(new RegExp("^["+ chars+"]+","g"),"");}
function rtrim(str,chars){chars=chars||"\\s";return str.replace(new RegExp("["+ chars+"]+$","g"),"");}
function firstSpace(str){if(str!=""){var firstChar=str.charAt(0);if(firstChar==" "){return true;}else{return false;}}else{return false;}}
function endSpace(str){if(str!=""){var endChar=str.charAt(str.length- 1);if(endChar==" "){return true;}else{return false;}}else{return false;}}
function duplicateTags(input){var commaSeparated=split(input);for(var i=0;i<commaSeparated.length;i++){var count=0;for(var j=0;j<commaSeparated.length;j++){if(commaSeparated[i]==commaSeparated[j]){count++;}}
if(count>1){return true;}}
return false;}
function emptyTags(input){local_input=$.trim(input);var commaSeparated=split(local_input);for(var i=0;i<commaSeparated.length;i++){if($.trim(commaSeparated[i])==""){return true;}}
return false;}
function validateYoutube(url){var p=/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;return(url.match(p))?RegExp.$1:false;}