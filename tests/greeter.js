( function( window, $ ) {

'use strict';

var NiceGreeter = $.bridget('niceGreeter');

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

// option setter
NiceGreeter.prototype._setOptionLoudGreeting = function( loudGreeting ) {
  // capitalize loud greeting
  this.options.loudGreeting = loudGreeting.toUpperCase();
};

NiceGreeter.prototype.shout = function( recipient ) {
  recipient = ( recipient || this.options.recipient ).toUpperCase();
  this.element.text( this.options.loudGreeting + ' ' + recipient );
  this.shoutCount++;
  console.log( 'Shouted ' + this.options.loudGreeting + ' ' + this.shoutCount + ' times' );
};

})( window, jQuery );

