// Copyright 2002-2015, University of Colorado

/**
 * Created by Michael on 7/15/2015.
 */

(function() {
  function confirmNavigation() {
    window.onbeforeunload = null;
    var confirmOnPageExit = function( e ) {
      e = e || window.event;
      var message = 'Your changes will not be saved';
      if ( e ) {
        e.returnValue = message;
      }
      return message;
    };

    // This needs to be reset or the register button will only work once.
    $( 'input[type="submit"]' ).click( function() { window.onbeforeunload = null; } );

    $( 'input , select' ).not( 'div#page-header-search form#search-form input , input[type="submit"]' ).change( function() {
        window.onbeforeunload = confirmOnPageExit;
    } );
  }

  var interval = setInterval( function() {
    if ( typeof $ !== 'undefined' ) {
      $( document ).ready( function() {
        confirmNavigation();
      } );
      clearInterval( interval );
    }
  }, 100 );


})();