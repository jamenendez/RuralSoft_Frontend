  function mOvr(src,clrOver) {
    if (!src.contains(event.fromElement)) {
	  src.style.cursor = 'hand';
	  src.bgColor = clrOver;
	}
  }
  function mOut(src,clrIn) {
	if (!src.contains(event.toElement)) {
	  src.style.cursor = 'default';
	  src.bgColor = clrIn;
	}
  }
  function mClk(src) {
    if(event.srcElement.tagName=='TD'){
	  src.children.tags('A')[0].click();
    }
  }
  
  function addToFavorite(favTitle){
  if ((navigator.appVersion.indexOf("MSIE") > 0) && (parseInt(navigator.appVersion) >= 4)) {
    window.external.AddFavorite(location.href, unescape(favTitle));
  }
}

/*Current date script credit: 
Website Abstraction (www.wsabstract.com)
Over 200+ free scripts here!
*/

var mydate=new Date()
var year=mydate.getYear()
if (year < 1000)
year+=1900
var day=mydate.getDay()
var month=mydate.getMonth()
var daym=mydate.getDate()
if (daym<10)
daym="0"+daym
var montharray=new Array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre")
