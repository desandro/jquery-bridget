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
    var greeter = $ex1.data('niceGreeter');
    equal( typeof $ex1.data('niceGreeter'), 'object', 'instance accessible in .data()' );
    equal( $ex1.text(), 'hello world', 'default settings' );
    // method with argument
    $ex1.niceGreeter( 'sayHi', 'pretty boy' );
    equal( $ex1.text(), 'hello pretty boy', 'sayHi method with argument' );
    // option setter
    $ex1.niceGreeter( 'option', { greeting: 'bonjour' }).niceGreeter();
    equal( greeter.options.greeting, 'bonjour', 'greeter.options.greeting = bonjour' );
    equal( $ex1.text(), 'bonjour world', 'option setter' );
    // method
    $ex1.niceGreeter({ loudGreeting: 'well hi there' });
    $ex1.niceGreeter('shout');
    equal( $ex1.text(), 'WELL HI THERE WORLD', 'shout method with argument' );
    // private method _whisper
    $ex1.niceGreeter( '_whisper', 'sweet nothings' );
    notEqual( $ex1.text(), 'sweet nothings', 'private method _whisper is private' );
  });

});

})( window, jQuery );
