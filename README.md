# Bridget makes jQuery plugins

Bridget makes a jQuery plugin out of a constructor.

It's based off of the [jQuery UI widget factory](http://jqueryui.com/widget/). You should probably use that, since it's very good. I use this, since it's a bit simpler. Used for [Packery](http://packery.metafizzy.co).

``` js
// plugin constructor
function NiceGreeter( element, options ) {
  this.element = $( element );
  this.options = $.extend( true, {}, this.options, options );
  this._init();
}
// defaults for plugin options
NiceGreeter.prototype.options = {
  greeting: 'hello',
  recipient: 'world'
};
// main plugin logic
NiceGreeter.prototype._init = function() {
  this.element.text( this.options.greeting + ' ' + this.options.recipient );
};
// convert constructor to jQuery plugin
$.bridget( 'niceGreeter', NiceGreeter );

// now the constructor can be used as a jQuery plugin
var $elem = $('#elem');
$elem.niceGreeter();
// >> h1 text will be 'hello world'

// set options
$elem.niceGreeter({
  greeting: 'bonjour',
  recipient: 'mon ami'
});
// >> text will be 'bonjour mon ami'

// access constructor instance via .data()
var myGreeter = $elem.data('niceGreeter');
```

## Bower

Bridget is a [Bower](http://twitter.github.com/bower) component.

``` bash
bower install desandro/jquery-bridget
```
