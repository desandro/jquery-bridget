/**
 * Bridget tests
 */

( function( window, $ ) {

'use strict';

// -------------------------- tests -------------------------- //

$( function() {

  $.bridget( 'niceGreeter', window.NiceGreeter );

  test( 'niceGreeter on dummy element', function() {
    ok( $.fn.niceGreeter, 'plugin added to jQuery namespace, $.fn.niceGreeter' );
    var $div = $('<div />');
    ok( $div.niceGreeter, '.niceGreeter method is there' );
    $div.niceGreeter();
    equal( typeof $div.data('niceGreeter'), 'object', 'instance accessible in .data()' );
  });

  test( 'niceGreeter', function() {
    var $ex1 = $('#ex1');
    $ex1.niceGreeter();
    var ex1Greeter = $ex1.data('niceGreeter');
    equal( $ex1.text(), 'hello world', 'default settings' );
    $ex1.niceGreeter( 'sayHi', 'pretty boy' );
    equal( $ex1.text(), 'hello pretty boy', 'method' );
    // shout method
    $ex1.niceGreeter({ loudGreeting: 'well hi there' });
    $ex1.niceGreeter('shout');
    equal( $ex1.text(), 'WELL HI THERE WORLD', 'custom shout method setter' );
  });

  // declarative

  var $ex2 = $('#ex2');

  test( 'baller', function() {
    $ex2.baller();
    var myBaller = $ex2.data('baller');
    ok( myBaller, 'instance is there' );
    equal( myBaller.rims, 'a-plenty', '_create method was not overwritten' );
    $ex2.baller( 'option', {
      foo: 'bar'
    });
    equal( myBaller.options.foo, 'bar', 'option setter works' );

  });

});


// option setter



})( window, jQuery );
