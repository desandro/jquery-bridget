# Bridget makes jQuery widgets

Based off of the jQuery UI widget factory. You should probably use that, since it's very good. I use this, since it's a bit simpler. Used for Masonry and Isotope.

``` js
var MyPluginWidget = $.bridget('myPluginWidget');

// set defaults for plugin options
MyPluginWidget.defaults = {
  foo: true,
  bar: 'baz',
  num: 12
};

// enable plugin methods
// $elem.myPluginWidget( 'sayHi', 'Bridget, darling' );
MyPluginWidget.prototype.sayHi = function( recipient ) {
  recipient = recipient || 'world';
  console.log( 'Hello ' + recipient );
};
```

## TODO

### Test

+ $.bridget is a function
+ $.bridget.bridge is a function
+ $.bridget.Widget is a function
+ $.bridget.Widget._create() is a function
+ $.bridget.Widget._init() is a function

Create a new widget check

._init() is a function
._create() is a function
.option sets options

<!-- class with _setOptionFoo does extra logic -->

+ `destroy` and `_destroy` methods
