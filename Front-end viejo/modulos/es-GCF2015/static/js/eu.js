$(document).ready(euReady);var mobWidth=790;var visibleLesson="";function euReady(){$(window).resize(validatePageSize);validatePageSize();selectHeaderCategory();breadcrumb();$(document).on("click",".phoneMenu",phoneHeaderMenu);$(document).on("click",".pageMenu",showTOC);$(document).on("click",".pageMenuMobile",showTOC);$(document).on("click",".showpages",showPages);$('.link_tooltip').tooltip({track:true});$(document).on("click","#print_btn",printerFriendlyView);$(document).on("click","#contact_link",contactLink);$(document).on("click","#contact_cancel",contactCancel);$(document).on("click","#contact_send",contactSend);$(document).on("click",".openzoom",openZoom);$(document).on("click",".popUpVideo",popUpVideo);$(document).on("click",".popUpFlash",popUpFlash);loadArticleImage();conditionalLoad();}
function validatePageSize(){if($(window).width()<mobWidth){showPhone();}else{showBrowser();}}
function selectHeaderCategory(){var url=new String(window.location.href);if(url.indexOf("/tecnologia/")!==-1){$('#header_technology_link').addClass('selected');}else if(url.indexOf("/ingles/")!==-1){$('#header_english_link').addClass('selected');}else if(url.indexOf("/matematica")!==-1){$('#header_mathematics_link').addClass('selected');}else if(url.indexOf("/vida_diaria/")!==-1){$('#header_edl_link').addClass('selected');}}
function showBrowser(){$(".phoneMenu").removeClass("rotated");$(".navigation").show();$(".account").show();$(".submenu").hide();$(".mainMenuVertical").hide();$(".navigationphone").hide();if(!$(".navigation").is(".navbrowser")){$(".navigation").addClass("navbrowser");}
if($(".navigation").is(".navphone")){$(".navigation").removeClass("navphone").addClass("navbrowser");}
if($(".account").is(".accphone")){$(".account").removeClass("accphone");}}
function showPhone(){$(".navigation").hide();$(".account").hide();$(".submenu").hide();$(".navigationphone").show();if(!$(".navigation").is(".navphone")){$(".navigation").addClass("navphone");}
if(!$(".navigation").is(".navphone")){$(".navigation").addClass("navphone").removeClass("navbrowser");}
if(!$(".account").is(".accphone")){$(".account").addClass("accphone");}
contentTumbHomePhone();}
function contentTumbHomePhone(){if($(".contentThumbHome").val()!==undefined){$(".contentThumbHome").each(function(){if($(this).is(".thumbHome")){$(this).css("background","none repeat scroll 0 0 #34BFC6").removeClass("thumbHome");$(this).css("background-size","");}});}}
function phoneHeaderMenu(e){e.preventDefault();$(".mainMenuVertical").slideToggle();if($(this).hasClass("rotated")){$(this).removeClass("rotated");}else{$(this).addClass("rotated");}
e.stopImmediatePropagation();}
function showTOC(){$(".pageMenu").toggleClass("rotate");$(".pageMenuMobile").toggleClass("uparrow");if($("#the_toc").html()==""){var actualPage=$(".pageMenu").data("pid");$.get($(".pageMenu").data("tocurl").replace(".do","/ajax/toc.do")+"?pid="+ actualPage,function(response){$("#the_toc").html(response);$(document).scrollTop(0);$("#the_toc").slideToggle();});}else{$(document).scrollTop(0);$("#the_toc").slideToggle();}}
function conditionalLoad(){if($(".openzoom").length>0||$(".popUpVideo").length>0||$(".popUpFlash").length>0){loadCSSAndScript("/static/css/shadowbox/shadowbox.css","/static/js/external/shadowbox.js",function(){log("Shadowbox loaded!");Shadowbox.init({});});}else{log("Shadowbox skipped!");}
if($(".gallerySlider").length>0){loadCSS("/static/css/slider/themes/dark/dark.css",function(){loadCSSAndScript("/static/css/slider/nivo-slider.css","/static/js/slider/jquery.nivo.slider.js",function(){log("NivoSlider loaded!");if(window.location.href.indexOf("print=true")<0){$('.gallerySlider').nivoSlider();$(".nivo-caption").remove();}});});}else{log("NivoSlider skipped!");}
if($(".gcf_interactive").length>0){loadScript("/static/js/interactives/interactives.js",function(){log("Interactives loaded!");loadInteractives();});}else{log("Interactives skipped!");}
if($(".allquiz").length>0){loadCSSAndScript("/static/css/eu/quices.css","/static/js/external/quices.js",function(){log("Quices loaded!");});}else{log("Quices skipped!");}}
function loadCSSAndScript(css,script,callback){$.ajax({url:css,cache:true,success:function(response){$("head").append("<style type=\"text/css\">"+ response+"</style>");$.ajax({url:script,cache:true,success:function(response){callback();}});}});}
function loadCSS(css,callback){$.ajax({url:css,cache:true,success:function(response){$("head").append("<style type=\"text/css\">"+ response+"</style>");callback();}});}
function loadScript(script,callback){$.ajax({url:script,cache:true,success:function(response){callback();}});}
function isUrlHtml5(url){return String(url).indexOf(".html")!=-1}
function isUrlFlash(url){return String(url).indexOf(".swf")!=-1}
function printerFriendlyView(){window.open(window.location.href+"?print=true");}
function breadcrumb(){$('ul li:has(ul)').hover(function(){$(this).find('ul').css({display:"block"});},function(){$(this).find('ul').css({display:"none"});});}
function showPages(e){e.preventDefault();var lid=$(this).data("lessonid");if(lid==visibleLesson){return;}
visibleLesson=lid;$(".showpages").each(function(){var $l=$(this);$l.children(".lessonindexBox").removeClass("highlitedLesson");$("#pages_"+ $l.data('lessonid')).slideUp(500);});$("#pages_"+ lid).slideToggle(500);$("#lesson_"+ lid).children(".lessonindexBox").addClass("highlitedLesson");e.stopImmediatePropagation();}
function contactLink(e){e.preventDefault();$(".whitebckdonate").addClass("topup");$("#the_header").addClass("topcero");$(".main").removeClass("toprel");$("#the_footer").removeClass("margintoprel");getForm();e.stopImmediatePropagation();}
function contactCancel(e){e.preventDefault();hideForm(false);e.stopImmediatePropagation();}
function contactSend(e){e.preventDefault();sendForm();e.stopImmediatePropagation();}
function sendForm(){var $idForm=$("#reportform");var $emailValue=$('#mail_label').val();var $emailContentValue=$('#message_label').val();$('.escribenosMessageBox').removeClass('escribenosMessageBoxempty');var words;if(getLang()=='es'){words=words_es;}else{words=words_pt;}
if(IsEmail($emailValue)){if($emailContentValue==""){$('.reporterroruserEmail').find('.message').html('<div style="padding: 4px;  background-color: #fff; border-radius: 5px; color:#07B1BF;"><div aria-hidden="true" data-icon="&#xe013;" style="font-size:30px; float:left;"></div>'+ words.invalid_message+'</div>');$('.escribenosMessageBox').addClass('escribenosMessageBoxempty');}else{$.ajax({url:'/contact/ajax/send.do',type:"POST",data:$idForm.serialize(),success:function(response){hideForm();},error:function(request,status,error){}});}}
else{$('.reporterroruserEmail').find('.message').html('<div style="padding: 4px;  background-color: #FFE51E; border-radius: 5px;"><div aria-hidden="true" data-icon="&#xe013;" style="font-size:30px; float:left;"></div>'+ words.invalid_email+'</div>');}}
function getForm(){$.get('/static/contact/contact_form.html',function(data){$("#contact_form").html(data);lang_locate();$("#contact_form").show();$('#message_label').focus();$("#url_from").val(window.location.href);$("body").animate({scrollTop:$("#contact_form").offset().top},'slow');});}
function hideForm(){$("#contact_form").slideToggle("slow",function(){$("#contact_form").html("");});}
function lang_locate(){var words;if(getLang()=='es'){words=words_es;}else{words=words_pt;}
$('#title_label').html(words.title_label);$('#description_label').html(words.description_label);$('#username_label').attr('placeholder',words.username_label);$('#mail_label').attr('placeholder',words.mail_label);$('#message_label').attr('placeholder',words.message_label);$('#contact_send').html(words.contact_send);$('#contact_cancel').html(words.contact_cancel);$('#subscribe_label').html(words.subscribe);enablePlaceHolder();}
function enablePlaceHolder(){$('input[type=text],textarea,.password').each(function(){var $input=$(this);var placeHolder=$input.data("placeholder");if(placeHolder!=undefined&&placeHolder!=""&&$input.val()==''){var texto=htmlDecode(placeHolder);$input.val(texto);if($input.is(".password")){cloneInput($input,"text",texto);}}});}
function htmlDecode(value){if(value){return $('<div/>').html(value).html();}else{return'';}}
function cloneInput($input,type,text){var $newInput=$input.clone().attr('type',type).val(text);$input.replaceWith($newInput);return $newInput;}
function getLang(){if(window.location.href.indexOf('gcfaprendelivre.org')>-1){return'pt';}
return'es';}
function IsEmail(email){var regex=/^([a-zA-Z){1}])+([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;if(regex.test(email))
return true;else
return false;}
function openZoom(e){e.preventDefault();var infoLink=$(this).data("imgurl");infoLink=infoLink.replace("_m.","_l.");infoLink=infoLink.replace("_s.","_l.");infoLink=infoLink.replace("_p.","_l.");Shadowbox.open({content:infoLink,player:"img",title:"",handleOversize:"none",modal:true});e.stopImmediatePropagation();}
function popUpVideo(e){e.preventDefault();var url=$(this).data("videourl");var videoframe='<div class="contentColumnRowVideo video-container">'+ getVideoFrame(url)+'</div>';Shadowbox.open({content:videoframe,player:"html",title:"",handleOversize:"none",modal:true,width:745,height:452});e.stopImmediatePropagation();}
function popUpFlash(e){e.preventDefault();var url=$(this).data("flashurl");var flashframe=getEmbedTag(url);Shadowbox.open({content:flashframe,players:"html",title:"",handleOversize:"none",modal:true,width:640,height:480});e.stopImmediatePropagation();}
function getEmbedTag(link){var tag='';if(isUrlFlash(link)){tag="<object width='640px' height='480px' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'>";tag+="<param value='high' name='quality'>";tag+="<param value='T' name='salign'>";tag+="<param value='"+ link+"' name='src'>";tag+="<embed width='640px' height='480px' align='center' quality='high' src='"
+ link+"' type='application/x-shockwave-flash'>";tag+="</object>";}else if(isUrlHtml5(link)){tag='<iframe src="'+ link+'" width="100%" height="100%"></iframe>';}
return tag;}
function getVideoFrame(link){return'<iframe src="'+ link+'"allowfullscreen></iframe>';}
function loadArticleImage(){if($("#article_image").length==0){return;}
var $img=$("#article_image");var url=$img.data("image");var newurl;if($(document).width()<=mobWidth){newurl=url.replace("xl","l");}else{newurl=url;}
$img.css("background-image",'url("'+ newurl+'")');}
function log(msg){}