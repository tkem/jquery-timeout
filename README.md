# [jQuery Timeout Plugin](http://github.com/tkem/jquery-timeout/)

**jQuery 1.5** introduced the [Deferred Object][1] to register
callbacks for asynchronous events.  Although the jQuery documentation
contains examples on how to use Deferred objects with the native
[`window.setTimeout()`][2] and [`window.clearTimeout()`][3] functions,
jQuery does not provide a simple interface for timer-based Deferreds
yet.

This plugin provides the two functions `jQuery.timeout()` and
`jQuery.timeoutWith()` that create a Deferred object which is resolved
after a given delay.  The returned Timeout object extends the
Deferred's Promise and provides additional methods for clearing and
resetting pending timeouts.


## API Documentation

### jQuery.timeout( delay [, args... ] )

Create a Deferred object that will be resolved after the specified
`delay` in milliseconds.  When the Deferred is resolved, any
doneCallbacks are called with optional arguments `args`.  The returned
Timeout object extends the Deferred's Promise object with addional
methods for clearing and resetting pending timeouts.

### jQuery.timeoutWith( delay, context [, args ] )

Create a Deferred object that will be resolved after the specified
`delay` in milliseconds.  When the Deferred is resolved, any
doneCallbacks are called with the given `context` as the `this`
object, and the optional array `args` as arguments.  The returned
Timeout object extends the Deferred's Promise object with addional
methods for clearing and resetting pending timeouts.

### timeout.clear( [ args... ] )

Clear a pending Timeout object by immediately rejecting the
corresponding Deferred object.  When the Deferred is rejected, any
failCallbacks are called with optional arguments `args`.

### timeout.clearWith( context [, args ] )

Clear a pending Timeout object by immediately rejecting the
corresponding Deferred object.  When the Deferred is rejected, any
failCallbacks are called with the given `context` as the `this`
object, and the optional array `args` as arguments.

### timeout.reset( [ newDelay ] )

Reset a pending Timeout object by restarting its timer.  If the
optional argument `newDelay` is specified, the corresponding Deferred
object will be resolved after `newDelay` milliseconds.  Otherwise, the
original `delay` passed to `jQuery.timeout()` or
`jQuery.timeoutWith()`, or the last delay specified via
`timeout.reset()` is used.  Note that calling `timeout.reset()` has no
effect if the Deferred has already been resolved or rejected.


## Examples

Invoke a callback function after a five-second delay:

    $.timeout( 5000, $("#status"), "5 seconds" ).done(function( $e, msg ) {
        $e.text( msg + " later..." );
    });

Same as above, but pass the element as context argument to
`jQuery.timeoutWith()`:

    $.timeoutWith( 5000, $("#status"), [ "5 seconds" ] ).done(function( msg ) {
        this.text(msg + " later...");
    });

Provide handlers to be called when the timeout is resolved (elapsed)
or rejected (cleared), and event handlers to manually clear or reset
the timeout.

    var now = $.now();
    var timeout = $.timeout( 10000 );
    timeout.then(
        function() {
            alert( "Timeout elapsed after " + ($.now() - now) + "ms." )
        },
        function() {
            alert( "Timeout cleared after " + ($.now() - now) + "ms." )
        }
    );
    $( "#clear" ).click(function() {
        timeout.clear();
    });
    $( "#reset" ).click(function() {
        timeout.reset();
    });


## License

Copyright 2011-2014 Thomas Kemmer.

Licensed under the [MIT License][4].


[1]: http://api.jquery.com/category/deferred-object/
[2]: http://developer.mozilla.org/en/docs/Web/API/window.setTimeout
[3]: http://developer.mozilla.org/en/docs/Web/API/window.clearTimeout
[4]: http://raw.github.com/tkem/jquery-timeout/master/LICENSE
