/**
 * Bridget tests
 */

( function( window, $ ) {

'use strict';

test( 'bridging it', function() {
  ok( $.fn.niceGreeter, 'plugin added to jQuery namespace, $.fn.niceGreeter' );
});


$( function() {

  var $ex1 = $('#ex1');

  $ex1.niceGreeter();
  var ex1Greeter = $ex1.data('niceGreeter');


  test( 'scripted plugin', function() {
    equal( $ex1.text(), 'hello world', 'default settings' );
  });

  // declarative

  var $ex2 = $('#ex2');

  test( 'declarative', function() {
    var attrOptions = $ex2.data('nice-greeter-options');
    var ex2Greeter = $ex2.data('niceGreeter');
    ok( ex2Greeter, 'instance exists, accessible via $.fn.data' );
    equal(
      ex2Greeter.options.recipient,
      attrOptions.recipient,
      'HTML attribute option overwrites default option'
    );
    equal(
      $ex2.text(),
      attrOptions.greeting + ' ' + attrOptions.recipient,
      'plugin _init method works'
    );
  });

});


// option setter



})( window, jQuery );
