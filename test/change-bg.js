( function( window, $ ) {

'use strict';

function ChangeBackground( element, options ) {
  this.element = $(element);

  this.options = $.extend( this.constructor.defaults, options );

  this._init();
}



ChangeBackground.defaults = {
  color: '#00ACEE'
};

ChangeBackground.prototype._init = function() {
  console.log('init');
  this.element.css({
    background: this.options.color
  });
};


$.bridget( 'changeBackground', ChangeBackground );


})( window, jQuery );
