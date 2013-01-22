( function( window, $ ) {

'use strict';

function Baller( element, options ) {
  this.options = {};
  this._create();
}

Baller.prototype._create = function() {
  this.rims = 'a-plenty';
};

$.bridget( 'baller', Baller );

window.Baller = Baller;

})( window, jQuery );
