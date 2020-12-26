# Bridget makes jQuery plugins

Bridget makes a jQuery plugin out of a constructor :factory:

It's based off of the [jQuery UI widget factory](https://jqueryui.com/widget/). Used for [Masonry](https://masonry.desandro.com), [Isotope](https://isotope.metafizzy.co), [Packery](https://packery.metafizzy.co), [Flickity](https://flickity.metafizzy.co), [Infinite Scroll](https://infinite-scroll.com), and [Draggabilly](https://draggabilly.desandro.com).

## Plugin constructor

A plugin constructor uses Prototypal pattern. It needs to have a `._init()` method used for its main logic.

``` js
// plugin constructor
// accepts two argments, element and options object
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
  var message = this.getMessage();
  this.element.text( message );
};
// getter method
NiceGreeter.prototype.getMessage = function() {
  return this.options.greeting + ' ' + this.options.recipient;
};
```

## Usage

Bridget can make this constructor work as a jQuery plugin. The `namespace` is the plugin method - `$elem.namespace()`.

``` js
// convert constructor to jQuery plugin
jQueryBridget( 'niceGreeter', NiceGreeter );
// optional: pass in jQuery variable
jQueryBridget( 'niceGreeter', NiceGreeter, jQuery );

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

Getter methods can still be used. For jQuery objects with multiple elements, getter methods will return the value of the first element.

## Package managers

Install with npm `npm install jquery-bridget`

Install with Yarn `yarn add jquery-bridget`

## MIT license

Bridget is released under the [MIT license](https://desandro.mit-license.org).
