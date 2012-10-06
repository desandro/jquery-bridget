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

// -------------------------- bridget -------------------------- //

/**
 * @returns Function - the plugin class
 * @param {String} namespace
**/
function bridget( namespace ) {
  // create plugin constructor class
  var className = toDash( namespace );
  var PluginClass = function( element, options ) {
    this.element = $( element );
    // set options,
    this.options = $.extend( true, {}, this.constructor.defaults, options );
    this.element.addClass( className );
    this._create();
    this._init();
  };

  // inherit from Widget
  PluginClass.prototype = new Widget();

  bridge(namespace, PluginClass);

  return PluginClass;
}

// make available in jQuery namespace
$.bridget = bridget;

// -------------------------- Widget -------------------------- //
// base class that plugin will inherit from

function Widget() {}

Widget.prototype._create = function() {};

Widget.prototype._init = function() {};

// widgets that bridget makes
bridget.Widget = Widget;

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
          instance.option( options || {} );
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
