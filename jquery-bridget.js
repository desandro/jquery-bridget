/**
 * Bridget makes jQuery widgets
 * v3.0.1
 * MIT license
 */

( function( window, factory ) {
  // module definition
 if ( typeof module == 'object' && module.exports ) {
   // CommonJS
   module.exports = factory(
       window,
       require('jquery'),
   );
 } else {
   // browser global
   window.jQueryBridget = factory(
       window,
       window.jQuery,
   );
 }

}( window, function factory( window, jQuery ) {

// ----- utils ----- //

// helper function for logging errors
// $.error breaks jQuery chaining
let console = window.console;
let logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      if ( !opts ) return;

      this.options = Object.assign( this.options || {}, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0, ...args ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    let returnValue;
    let pluginMethodStr = `$().${namespace}("${methodName}")`;

    $elems.each( function( i, elem ) {
      // get instance
      let instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( `${namespace} not initialized.` +
          ` Cannot call method ${pluginMethodStr}` );
        return;
      }

      let method = instance[ methodName ];
      if ( !method || methodName.charAt( 0 ) == '_' ) {
        logError(`${pluginMethodStr} is not a valid method`);
        return;
      }

      // apply method, get return value
      let value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    } );

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      let instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    } );
  }

}

// -----  ----- //

return jQueryBridget;

} ) );
