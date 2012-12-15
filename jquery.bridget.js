/**
 * Bridget makes jQuery widgets
 */

/*jshint browser: true, curly: true, devel: true, eqeqeq: true, forin: false, immed: false, jquery: true, newcap: true, noempty: true, strict: true, undef: true */

( function( window, $ ) {

'use strict';

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
function toDash(str) {
  return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
    return $1 + '-' + $2;
  }).toLowerCase();
}

// helper function
function capitalize( str ) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// -------------------------- bridget -------------------------- //

/**
 * Make a jQuery Widget
 * @param {String} namespace - the name of the plugin
 * @param {Function} Widget - plugin constructor class
 * @returns {Function} Widget - plugin constructor class
**/
function bridget( namespace, Widget ) {
  // create plugin constructor class

  setOptionMethod( Widget );

  bridge( namespace, Widget );

  onDocReady( namespace );

  return Widget;
}

// make available in jQuery namespace
$.bridget = bridget;

// ----- setOptionMethod ----- //

// sets option method on the Widget
function setOptionMethod( Widget ) {
  // bail out if already set
  if ( Widget.prototype.option ) {
    return;
  }

  Widget.prototype.option = function( opts ) {

    if ( !$.isPlainObject( opts ) ){
      return;
    }

    this.options = $.extend( true, this.options, opts );

    // trigger option setter _setOptionName if it exists
    for ( var optionName in opts ) {
      var setOptionMethod = '_setOption' + capitalize( optionName );
      if ( this[ setOptionMethod ] ) {
        var opt = opts[ optionName ];
        this[ setOptionMethod ]( opt );
      }
    }
  };
}

bridget.setOptionMethod = setOptionMethod;

// ----- onDocReady ----- //

// activate widget on doc ready
// with any matching selector, i.e. js-widget-name
function onDocReady( namespace ) {
  var dashedName = toDash( namespace );
  $( function() {
    $( '.js-' + dashedName ).each( function( elem, i ) {
      var $this = $(this);
      var options = $this.data( dashedName + '-options' );
      $this[ namespace ]( options );
    });
  });
}


// -------------------------- plugin bridge -------------------------- //

// helper function for logging errors
// $.error breaks jQuery chaining
var hasConsole = typeof console !== 'undefined';
function logError( message ) {
  if ( hasConsole ) {
    console.error( message );
  }
}

/**
 * jQuery plugin bridge, access methods like $elem.plugin('method')
 * @param {String} namespace - plugin name
 * @param {Function} PluginClass - constructor class
 */
function bridge( namespace, Widget ) {
  // add to jQuery fn namespace
  $.fn[ namespace ] = function( options ) {
    if ( typeof options === 'string' ) {
      // call plugin method when first argument is a string
      // get arguments for method
      var args = Array.prototype.slice.call( arguments, 1 );
      this.each( function() {
        var instance = $.data( this, namespace );
        if ( !instance ) {
          logError( "cannot call methods on " + namespace + " prior to initialization; " +
            "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction(instance[options]) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for " + namespace + " instance" );
          return;
        }
        // trigger method with arguments
        instance[ options ].apply( instance, args );
      });
    } else {
      this.each( function() {
        var instance = $.data( this, namespace );
        if ( instance ) {
          // apply options & init
          instance.option( options );
          instance._init();
        } else {
          // initialize new instance
          instance = new Widget( this, options );
          $.data( this, namespace, instance );
        }
      });
    }
    return this;
  };

}

// expose in bridget's namespace
bridget.bridge = bridge;

})( window, jQuery );
