( function( window, $ ) {

'use strict';

function ChangeBackground( element, options ) {
  this.element = $(element);

  this._setInitialOptions( options, ChangeBackground.defaults );
  console.log( this.options );
  this._init();
}


$.bridget( ChangeBackground );

ChangeBackground.defaults = {
  color: '#00ACEE'
};

ChangeBackground.prototype._init = function() {
  console.log('init', this.options.color );
  this.element.css({
    backgroundColor: this.options.color
  });
};


window.ChangeBackground = ChangeBackground;

})( window, jQuery );
