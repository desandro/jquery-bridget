( function( window, $ ) {

'use strict';

// Create a plugin constructor class
function NiceGreeter( element, options ) {
  this.element = $( element );
  // conveinence method to extend options over defaults
  this._setIntitialOptions( options );
  // widget properties
  this.helloCount = 0;
  this._init()
}

// bridget converts the constructor to a jQuery plugin
$.bridget( 'greeter', NiceGreeter );

// set defaults for plugin options
NiceGreeter.defaults = {
  greeting: 'hello',
  recipient: 'world'
};

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

