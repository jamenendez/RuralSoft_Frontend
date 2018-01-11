jQuery(document).ready(function($) {
  jQuery("#slideshow-fullwidth .slider-revolution").revolution({
    sliderType:"standard",
    sliderLayout:"auto",
    gridwidth: [1170,970,750,450],
    gridheight: drupalSettings.startupgrowth.sliderRevolutionFullWidthInit.slideshowFullWidthInitialHeight,
    delay: drupalSettings.startupgrowth.sliderRevolutionFullWidthInit.slideshowFullWidthEffectTime,
    disableProgressBar:'off',
    responsiveLevels:[1199,991,767,480],
    navigation: {
      onHoverStop:"off",
      arrows:{
        enable:true,
        tmp: "",
        left:{
          h_align:"left",
          v_align:"center",
          h_offset:15,
          v_offset:0
        },
        right:{
          h_align:"right",
          v_align:"center",
          h_offset:15,
          v_offset:0
        }
      },
      bullets:{
        style:"",
        enable:true,
        direction:"horizontal",
        space: 5,
        h_align: drupalSettings.startupgrowth.sliderRevolutionFullWidthInit.slideshowFullWidthBulletsPosition,
        v_align:"bottom",
        h_offset: 0,
        v_offset: 20,
        tmp:"",
      },
      touch:{
        touchenabled:"on",
        swipe_treshold:75,
        swipe_min_touches:1,
        drag_block_vertical:false,
        swipe_direction:"horizontal"
      }
    }
  });

  $('#slideshow-fullwidth .slider-revolution').bind("revolution.slide.onloaded",function (e) {
    $(".slider-revolution-wrapper:not(.one-slide) .tparrows").fadeIn("slow");
  });

});
;
jQuery(document).ready(function($) {
  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
      $("#toTop").addClass("show");
    } else {
      $("#toTop").removeClass("show");
    }
  });

  $("#toTop").click(function() {
    $("body,html").animate({scrollTop:0},800);
  });

var $root = $('html, body');
$('#superfish-main a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 800, function () {
        window.location.hash = href;
    });
    return false;
});

 $(".more-destination").click(function(e) {
        e.preventDefault();
        var clone = $(this).parent().prev("ul").clone().appendTo('body').height('auto');
        //var height = clone.height();
        var height = $(".image-style-imagenes-fotos-buscador").height();
        clone.remove();
        
        $(this).parent().prev("ul").animate({
            height: height
        }, 800, function() {});
        
        $(this).next(".less-destination").toggle();
        $(this).toggle();
        $('h6.subtitle').slideToggle();
    });

    $(".less-destination").click(function(e) {
        e.preventDefault();
        var clone = $(this).parent().prev("ul").clone().appendTo('body').height('');
        var height = clone.height();
        //var height = $(".image-style-imagen-principal-noticia").height();
        clone.remove();
        
        $(this).parent().prev("ul").animate({
            height: height
        }, 800, function() {});
        
        $(this).prev(".more-destination").toggle();
        $(this).toggle();
        $('h6.subtitle').slideToggle();
    });

});
;
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();;
jQuery(document).ready(function($) {
  if ($("body:not(.path-admin) [data-animate-effect]").length>0) {
    $("body:not(.path-admin) [data-animate-effect]").each(function() {
      var thisObject = $(this);
      var animation = thisObject.attr("data-animate-effect");
      if(animation != "no-animation") {
        var waypoints = thisObject.waypoint(function(direction) {
          var animatedObject = $(this.element);
          setTimeout(function() {
            animatedObject.addClass("animated in " + animation);
          }, 100);
          this.destroy();
        },{
          offset: "90%"
        });
      }
    });
  }
})
;
/**
* Add Javascript - Fixed Header
*/
jQuery(document).ready(function($) {
  var navItemHeight =  $("#main-navigation ul.menu li a").outerHeight(),
  navHeight =  $("#main-navigation").outerHeight(),
  toolbarHeight =  $("#toolbar-administration").outerHeight(),
  headerHeight = $("#header").outerHeight();
  if ($(".user-logged-in").length>0) {
    var toolbarHeight =  $("#toolbar-administration").outerHeight();
  } else {
    var toolbarHeight =  0;
  }

  // fix for Chrome
  if (navHeight > navItemHeight*2) {
    headerHeight = headerHeight - navItemHeight;
  };
  $(".logged-in .tabs.primary a, .logged-in .contextual-links a").click(function() {
    $("body").removeClass("onscroll");
    $("#header-container").css("paddingBottom", (0)+"px");
    $("#header").css("top", (0)+"px");
  });
  $(window).load(function() {
    if(($(window).width() > 767)) {
      $("body").addClass("fixed-header-enabled");
    } else {
      $("body").removeClass("fixed-header-enabled");
    }
  });
  $(window).resize(function() {
    if(($(window).width() > 767)) {
      $("body").addClass("fixed-header-enabled");
    } else {
      $("body").removeClass("fixed-header-enabled");
    }
  });
  $(window).scroll(function() {
    if (!(($(".transparent-header-active").length>0) && ($("#banner #slideshow-fullscreen").length>0))) {
      if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
        $("body").addClass("onscroll");
        $("#header-container").css("paddingBottom", (headerHeight)+"px");
        if ($("#toolbar-administration").length > 0) {
          var adminHeight = $('body').css('paddingTop');
          $("#header").css("top", adminHeight);
        }
      } else {
        $("body").removeClass("onscroll");
        $("#header-container").css("paddingBottom", (0)+"px");
        $("#header").css("top", (0)+"px");
      }
    } else {
      if (($(this).scrollTop() > 0) && ($(window).width() > 767)) {
        $("body").addClass("onscroll");
        if ($("#toolbar-administration").length > 0) {
          var adminHeight = $('body').css('paddingTop');
          $("#header").css("top", adminHeight);
        }
      } else {
        $("body").removeClass("onscroll");
        $("#header").css("top", (0)+"px");
      }
    };
  });
});;
!function(a,b,c){"use strict";function d(d,e){function k(){h.randomize&&!f.hasClass("slick-initiliazed")&&n(),f.on("setPosition.sl",function(a,b){o(b)}),a(".media--loading",f).closest(".slide__content").addClass("is-loading"),"blazy"===h.lazyLoad&&b.blazy&&f.on("beforeChange.sl",function(){var c=a(".b-lazy:not(.b-loaded)",f);c.length&&b.blazy.init.load(c)})}function l(){var b=this,c=f.slick("getSlick"),d=f.find(".media--player").length;f.parent().on("click.sl",".slick-down",function(b){b.preventDefault();var c=a(this);a("html, body").stop().animate({scrollTop:a(c.data("target")).offset().top-(c.data("offset")||0)},800,h.easing||"swing")}),h.mouseWheel&&f.on("mousewheel.sl",function(a,b){return a.preventDefault(),f.slick(b<0?"slickNext":"slickPrev")}),f.on("lazyLoaded lazyLoadError",function(a,b,c){m(c)}),d&&(f.on("afterChange.sl",p),f.on("click.sl",".media__icon--close",p),f.on("click.sl",".media__icon--play",q)),f.trigger("afterSlick",[b,c,c.currentSlide])}function m(b){var c=a(b),d=c.closest(".media--background"),e=c.closest(".slide")||c.closest(".unslick");c.parentsUntil(e).removeClass(function(a,b){return(b.match(/(\S+)loading/g)||[]).join(" ")}),d.length&&(d.css("background-image","url("+c.attr("src")+")"),d.find("> img").remove(),d.removeAttr("data-lazy"))}function n(){f.children().sort(function(){return.5-Math.random()}).each(function(){f.append(this)})}function o(a){var b=a.slideCount<=h.slidesToShow,c=b||h.arrows===!1;if(f.attr("id")===a.$slider.attr("id"))return h.centerPadding&&"0"!==h.centerPadding||a.$list.css("padding",""),b&&a.$slideTrack.width()<=a.$slider.width()&&a.$slideTrack.css({left:"",transform:""}),g[c?"addClass":"removeClass"]("visually-hidden")}function p(){f.removeClass("is-paused"),f.find(".is-playing").length&&f.find(".is-playing").removeClass("is-playing").find(".media__icon--close").click()}function q(){f.addClass("is-paused").slick("slickPause")}function r(c){return{slide:c.slide,lazyLoad:c.lazyLoad,dotsClass:c.dotsClass,rtl:c.rtl,appendDots:".slick__arrow"===c.appendDots?g:c.appendDots||a(f),prevArrow:a(".slick-prev",g),nextArrow:a(".slick-next",g),appendArrows:g,customPaging:function(a,d){var e=a.$slides.eq(d).find("[data-thumb]")||null,f='<img alt="'+b.t(e.attr("alt"))+'" src="'+e.data("thumb")+'">',g=e.length&&c.dotsClass.indexOf("thumbnail")>0?'<div class="slick-dots__thumbnail">'+f+"</div>":"";return a.defaults.customPaging(a,d).add(g)}}}var j,f=a("> .slick__slider",e).length?a("> .slick__slider",e):a(e),g=a("> .slick__arrow",e),h=f.data("slick")?a.extend({},c.slick,f.data("slick")):c.slick,i=!("array"!==a.type(h.responsive)||!h.responsive.length)&&h.responsive;if(i)for(j in i)i.hasOwnProperty(j)&&"unslick"!==i[j].settings&&(i[j].settings=a.extend({},c.slick,r(h),i[j].settings));f.data("slick",h),h=f.data("slick"),k(),f.slick(r(h)),l(),f.hasClass("unslick")&&f.slick("unslick"),a(e).addClass("slick--initialized")}b.behaviors.slick={attach:function(b){a(".slick",b).once("slick").each(d)}}}(jQuery,Drupal,drupalSettings);
;
