( function( window, $ ) {

'use strict';

function ChangeBackground( element, options ) {
  this.element = $(element);

  // this._setInitialOptions( options );

  console.log( this.constructor.name );

  this._init();
}


$.bridget( 'changeBackground', ChangeBackground );

ChangeBackground.defaults = {
  color: '#00ACEE'
};

ChangeBackground.prototype._init = function() {
  console.log('init');
  this.element.css({
    background: this.options.color
  });
};


window.ChangeBackground = ChangeBackground;

})( window, jQuery );
