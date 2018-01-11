/**
 * Uses animated divs to create a video player carousel
 */

var switchVideo;
var isEnglishLocale = window.location.pathname === '/' || window.location.pathname === '/en/';

// list all videos here
if ( isEnglishLocale ) {
  var simVideos = [
    { link: 'https://itunes.apple.com/us/app/phet-simulations/id1134126831?ls=1&mt=8' },
    { link: 'simulations/category/physics' },
    { link: 'simulations/category/chemistry' },
    { link: 'simulations/category/math' },
    { link: 'simulations/category/biology' },
    { link: 'simulations/category/earth-science' }
  ];
}
else {
  // If we are not in english locale, don't show the ipad app.
  document.getElementById( 'box0' ).remove();
  document.getElementById( 'box1' ).style.left = '0%';
  var simVideos = [
    { link: 'simulations/category/physics' },
    { link: 'simulations/category/chemistry' },
    { link: 'simulations/category/math' },
    { link: 'simulations/category/biology' },
    { link: 'simulations/category/earth-science' }
  ];
}


// force safari to reload page instead of saving the old state when users press 'back'
// this prevents the video from coming up as blank until the carousel shifts
window.onpageshow = function( event ) {
  if ( event.persisted ) {
    window.location.reload()
  }
};

function runVideoScript() {
  var ANIMATE_MILLISECONDS = 1000;
  var INTERVAL_LENGTH = 5000;
  var sourceIndex = 0; // index into simVideos

  var installerPath = 'index.html';
  var isInstallerBuild = window.location.pathname.indexOf( installerPath ) > -1;
  var locale;
  if ( isInstallerBuild ) {
    var splitPath = window.location.pathname.split( '/' );
    var localeRegex = /^.{2}$|^.{2}_.{2}$/;
    locale = 'file://' + window.location.pathname.replace(
        installerPath,
        localeRegex.test( splitPath[ splitPath.length - 2 ] ) ? '' : 'en/'
      );
  }
  else {
    locale = ( window.location.pathname === '/' ) ? '/en/' : window.location.pathname;
  }

  var videos = $( '.sim-video' );

  var i;
  for ( i = 0; i < videos.length; i++ ) {
    simVideos[ i ].title = $.trim( $( videos[ i ] ).text() );
  }

  var testVideo = document.createElement( 'video' );
  var videoSupport = ( testVideo.play ) ? true : false; // true is HTML5 video is supported

  // replace videos with images on iPhone or iPod
  if ( navigator.userAgent.match( /iPhone/i ) || navigator.userAgent.match( /iPod/i ) ) {
    videoSupport = false; // video is not used on iPhone
    var divs = document.getElementsByClassName( 'box' );
    for ( i = 0; i < divs.length; i++ ) {
      var video = divs[ i ].children[ 0 ];
      for ( var j = 0; j < video.children.length; j++ ) {
        if ( video.children[ j ].tagName === 'IMG' ) {
          var img = video.children[ j ];
        }
      }
      divs[ i ].removeChild( video );
      divs[ i ].appendChild( img );
    }
    videos = false;
  }

  var container = document.getElementById( 'video-container' );
  var simName = document.getElementById( 'sim-name' );

  var timer; // setInterval for changing videos
  var switchable = true; // whether or not the switch video buttons are enabled (they get disabled while animating)

  /**
   * Switch the video in the carousel by animating the div to slide over and changing the video source
   * @param direction the direction that the carousel should slide
   */
  switchVideo = function( direction ) {
    if ( !switchable ) {
      return; // don't allow the video to be switched during animation
    }
    switchable = false;

    var boxes = $( '.box' );

    // get the current video div
    var currentBoxId = boxes.filter( function() {
      return $( this ).offset().left === $( '#video-container' ).offset().left
    } )[ 0 ].id;
    var currentBox = $( '#' + currentBoxId );
    var nextBoxId = '';
    
    if ( direction === 'left' ) {
      if ( currentBox.next().size() > 0 ) {
        nextBoxId = currentBox.next().attr( 'id' );
        currentBox.next().css( 'left', '100%' );
      }
      else {
        nextBoxId = boxes.first().attr( 'id' );
        boxes.first().css( 'left', '100%' );
      }

      currentBox.animate( {
        left: '-100%'
      }, ANIMATE_MILLISECONDS );
      
      if ( currentBox.next().size() > 0 ) {
        currentBox.next().animate( {
          left: '0%'
        }, ANIMATE_MILLISECONDS );
      }
      else {
        boxes.first().animate( {
          left: '0%'
        }, ANIMATE_MILLISECONDS );
      }
    }
    else { // direction === 'right'

      if ( currentBox.prev().size() > 0 ) {
        nextBoxId = currentBox.prev().attr( 'id' );
        currentBox.prev().css( 'left', '-100%' );
      }
      else {
        nextBoxId = boxes.last().attr( 'id' );
        boxes.last().css( 'left', '-100%' );
      }

      currentBox.animate( {
        left: '100%'
      }, ANIMATE_MILLISECONDS );

      if ( currentBox.prev().size() > 0 ) {
        currentBox.prev().animate( {
          left: '0%'
        }, ANIMATE_MILLISECONDS );
      }
      else {
        boxes.last().animate( {
          left: '0%'
        }, ANIMATE_MILLISECONDS );
      }
    }

    // setup and start the next video
    sourceIndex = ( direction === 'left' ) ? ( sourceIndex + 1 ) % simVideos.length : ( sourceIndex - 1 );
    if ( sourceIndex < 0 ) {
      sourceIndex += simVideos.length;
    }

    videoSupport && videos[ sourceIndex ].play();
    simName.innerHTML = simVideos[ sourceIndex ].title;
    var href;
    if ( simVideos[ sourceIndex ].link.indexOf( 'https://' ) == 0 ) {
      href = simVideos[ sourceIndex ].link;
    }
    else {
      href = locale + simVideos[ sourceIndex ].link + ( isInstallerBuild ? '.html' : '' );
    }
    simName.setAttribute( 'href', href );
    document.getElementById( 'video-container' ).onclick = function() { window.location.href = href; };

    // restart the timer
    clearInterval( timer );
    var intervalLength = INTERVAL_LENGTH + ( nextBoxId === 'box0' ? 2000 : 0 );
    timer = setInterval( function() {switchVideo( 'left' );}, intervalLength );

    // set a timeout to ensure the button can't be pressed while animating
    setTimeout( function() {switchable = true;}, ANIMATE_MILLISECONDS );
  };

  videoSupport && videos[ sourceIndex ].play();
  simName.innerHTML = simVideos[ sourceIndex ].title;
  var href;
  if ( simVideos[ sourceIndex ].link.indexOf( 'https://' ) == 0 ) {
    href = simVideos[ sourceIndex ].link;
  }
  else {
    href = locale + simVideos[ sourceIndex ].link + ( isInstallerBuild ? '.html' : '' );
  }
  simName.setAttribute( 'href', href );
  document.getElementById( 'video-container' ).onclick = function() { window.location.href = href; };

  // switch videos every 5 seconds
  timer = setInterval( function() {switchVideo( 'left' );}, INTERVAL_LENGTH + 2000 );
}

// wait until jquery has loaded to run the script
var videoScriptIntervalId = setInterval( function() {
  if ( typeof $ !== 'undefined' ) {
    clearInterval( videoScriptIntervalId );
    runVideoScript();
  }
}, 100 );
