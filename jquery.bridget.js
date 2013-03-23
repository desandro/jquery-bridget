/**
 * Bridget makes jQuery widgets
 * v0.0.2
 */

( function( window, $ ) {

'use strict';

// -------------------------- utils -------------------------- //

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

// function uncapitalize( str ) {
//   return str.charAt(0).toLowerCase() + str.slice(1);
// }

// -------------------------- Widget -------------------------- //

function Widget() {}

var noop = function() {};

// default methods
Widget.prototype._create = noop;

Widget.prototype._init = noop;

// option setter
Widget.prototype.option = function( opts ) {
  // bail out if not an object
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

// -------------------------- bridget -------------------------- //

/**
 * Make a jQuery PluginClass
 * @param {String} namespace - the name of the plugin
 * @param {Function} PluginClass - plugin constructor class
 * @returns {Function} PluginClass - plugin constructor class
 */

function bridget( namespace, PluginClass ) {

  if ( PluginClass ) {
    extendWidgetMethods( PluginClass );
  } else {
    PluginClass = createPluginClass();
  }

  // bridge it
  bridge( namespace, PluginClass );
  onDocReady( namespace );

  return PluginClass;
}

// make available in jQuery namespace
$.bridget = bridget;

function createPluginClass() {
  function PluginClass( element, options ) {
    this.element = $( element );
    // instance options extended from default options
    this.options = $.extend( {}, this.options, options || {} );
    this._create();
    this._init();
  }

  PluginClass.prototype = new Widget();
  return PluginClass;
}

function extendWidgetMethods( PluginClass ) {
  // copy over required methods if they're not already there
  for ( var method in Widget.prototype ) {
    if ( !PluginClass.prototype[ method ] ) {
      PluginClass.prototype[ method ] = Widget.prototype[ method ];
    }
  }
}

// ----- onDocReady ----- //

// activate widget on doc ready
// with any matching selector, i.e. js-widget-name
function onDocReady( namespace ) {
  var dashedName = toDash( namespace );
  $( function() {
    $( '.js-' + dashedName ).each( function() {
      var $this = $(this);
      // get options from data-widget-name-options attribute
      var options = $this.data( dashedName + '-options' );
      $this[ namespace ]( options );
    });
  });
}

bridget.onDocReady = onDocReady;


// -------------------------- plugin bridge -------------------------- //

// helper function for logging errors
// $.error breaks jQuery chaining
var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

/**
 * jQuery plugin bridge, access methods like $elem.plugin('method')
 * @param {String} namespace - plugin name
 * @param {Function} PluginClass - constructor class
 */
function bridge( namespace, PluginClass ) {
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
          instance = new PluginClass( this, options );
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
