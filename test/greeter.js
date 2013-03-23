/**
 * NiceGreeter test plugin
 */

( function( window, $ ) {

'use strict';

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function NiceGreeter( element, options ) {
  this.element = $( element );
  this.options = extend( {}, this.options );
  extend( this.options, options );
  this._create();
  this._init();
}

// defaults for plugin options
NiceGreeter.prototype.options = {
  greeting: 'hello',
  recipient: 'world',
  loudGreeting: 'HEY'
};

NiceGreeter.prototype._create = function() {
  // initial widget properties
  this.helloCount = 0;
  this.shoutCount = 0;
};

// default logic
// $elem.niceGreeter()
NiceGreeter.prototype._init = function() {
  this.sayHi();
};

// enable plugin methods
// $elem.myPluginWidget( 'sayHi', 'Bridget, darling' );
NiceGreeter.prototype.sayHi = function( recipient ) {
  recipient = recipient || this.options.recipient;
  this.element.text( this.options.greeting + ' ' + recipient );
  this.helloCount++;
  console.log( 'Said ' + this.options.greeting + ' ' + this.helloCount + ' times' );
};

NiceGreeter.prototype.shout = function( recipient ) {
  var greeting = this.options.loudGreeting.toUpperCase();
  recipient = ( recipient || this.options.recipient ).toUpperCase();
  this.element.text( greeting + ' ' + recipient );
  this.shoutCount++;
  console.log( 'Shouted ' + greeting + ' ' + this.shoutCount + ' times' );
};

// private method
NiceGreeter.prototype._whisper = function( message ) {
  this.element.text( message );
};

window.NiceGreeter = NiceGreeter;

})( window, jQuery );
