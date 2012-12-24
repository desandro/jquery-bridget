( function( window, $ ) {

'use strict';

// Create a plugin constructor class
function NiceGreeter( element, options ) {
  this.element = $( element );
  // options from defaults and arguments
  this.options = $.extend( true, {}, NiceGreeter.defaults, options );
  // widget properties
  this.helloCount = 0;
  this._init();
}

// defaults for plugin options
NiceGreeter.defaults = {
  greeting: 'hello',
  recipient: 'world'
};

// bridget converts the constructor to a jQuery plugin
$.bridget( NiceGreeter );

NiceGreeter.prototype._init = function() {
  this.sayHi()
};

// enable plugin methods
// $elem.myPluginWidget( 'sayHi', 'Bridget, darling' );
NiceGreeter.prototype.sayHi = function( recipient ) {
  recipient = recipient || this.options.recipient;
  this.element.text( this.options.greeting + recipient );
  this.helloCount++;
  console.log( 'Said ' + this.options.greeting + ' ' + this.helloCount + ' times' );
};

})( window, jQuery );

