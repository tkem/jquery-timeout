# [jQuery Timeout Plugin](https://github.com/tkem/jquery-timeout)

**jQuery 1.5** introduced the [Deferred Object][1] to register
callbacks for asynchronous events.  Although the jQuery documentation
contains examples on how to use Deferred objects with the native
[`window.setTimeout()`][2] and [`window.clearTimeout()`][3] functions,
jQuery does not provide a simple interface for timer-based Deferreds
yet.

This plugin provides the two functions [`jQuery.timeout()`](#timeout)
and [`jQuery.timeoutWith()`](#timeoutWith) that create a Deferred
object which is resolved after a given delay.  The Deferred's Promise
object provides additional methods [`clear()`](#clear) and
[`clearWith()`](#clearWith), which will reject the Deferred and clear
the native timeout ID if called before the delay has elapsed.


## API Documentation

### <a name="timeout"></a> jQuery.timeout( delay [, args... ] )

Create a Deferred object that will be resolved after the specified
`delay` in milliseconds.  When the Deferred is resolved, any
doneCallbacks are called with optional arguments `args`.  The returned
`Timeout` object extends the Deferred's Promise object with the
addional methods [`clear()`](#clear) and [`clearWith()`](#clearWith),
for rejecting the Deferred before the delay has elapsed.

### <a name="timeoutWith"></a> jQuery.timeoutWith( delay, context [, args ] )

Create a Deferred object that will be resolved after the specified
`delay` in milliseconds.  When the Deferred is resolved, any
doneCallbacks are called with the given `context` as the `this`
object, and the optional array `args` as arguments.  The returned
`Timeout` object extends the Deferred's Promise object with the
addional methods [`clear()`](#clear) and [`clearWith()`](#clearWith),
for rejecting the Deferred before the delay has elapsed.

### <a name="clear"></a> timeout.clear( [ args... ] )

Clear a pending Promise object returned by
[`jQuery.timeout()`](#timeout) or
[`jQuery.timeoutWith()`](#timeoutWith) by immediately rejecting the
corresponding Deferred object.  When the Deferred is rejected, any
failCallbacks are called with optional arguments `args`.

### <a name="clearWith"></a> timeout.clearWith( context [, args ] )

Clear a pending Promise object returned by
[`jQuery.timeout()`](#timeout) or
[`jQuery.timeoutWith()`](#timeoutWith) by immediately rejecting the
corresponding Deferred object.  When the Deferred is rejected, any
failCallbacks are called with the given `context` as the `this`
object, and the optional array `args` as arguments.


## Examples

Invoke a callback function after a five-second delay:

    $.timeout( 5000, $("#status"), "5 seconds" ).done(function( $e, msg ) {
        $e.text( msg + " later..." );
    });

Same as above, but pass the element as context argument to
[`jQuery.timeoutWith()`](#timeoutWith):

    $.timeoutWith( 5000, $("#status"), [ "5 seconds" ] ).done(function( msg ) {
        this.text(msg + " later...");
    });

Provide handlers to be called when the timeout is resolved (elapsed)
or rejected (cleared), and an event handler to manually clear the
timeout.

    var timeout = $.timeout( 10000 );
    timeout.then(
        function() { alert( "timeout elapsed" ) },
        function() { alert( "timeout cleared" ) }
    );
    $( "#clear" ).click(function() {
        timeout.clear();
    });

[1]: http://api.jquery.com/category/deferred-object/
[2]: http://developer.mozilla.org/en/docs/Web/API/window.setTimeout
[3]: http://developer.mozilla.org/en/docs/Web/API/window.clearTimeout
