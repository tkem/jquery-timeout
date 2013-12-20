# [jQuery Timeout Plugin](https://github.com/tkem/jquery-timeout/)

**jQuery 1.5** introduced the _Deferred_ callback management system,
to ease handling callbacks for asynchronous events.  Although the
jQuery documentation contains examples on how to use Deferred objects
with the native `window.setTimeout` and `window.clearTimeout`
functions, jQuery does not provide a simple interface for timer-based
Deferreds yet.

This plugin provides the two functions `jQuery.timeout` and
`jQuery.timeoutWith` that, given a delay in milliseconds, create a
`jQuery.Deferred` instance that will be resolved after the given
delay.  The returned Promise object also provides `clear` and
`clearWith` methods, which will reject the Deferred object and clear
the native timeout ID, if called before the timeout has elapsed.


## API Documentation

### jQuery.timeout( delay [, args... ] )

Create a Deferred object that will be resolved after the specified
`delay` in milliseconds.  When the Deferred is resolved, any
doneCallbacks are called with optional arguments `args`.

### jQuery.timeoutWith( delay, context [, args ] )

Create a Deferred object that will be resolved after the specified
`delay` in milliseconds.  When the Deferred is resolved, any
doneCallbacks are called with the given `context` as the `this`
object, and the optional array `args` as arguments.

### timeout.clear( [ args... ] )

Clear a pending timeout by immediately rejecting the corresponding
Deferred object.  When the Deferred is rejected, any failCallbacks are
called with optional arguments `args`.

### timeout.clearWith( context [, args ] )

Clear a pending timeout by immediately rejecting the corresponding
Deferred object.  When the Deferred is rejected, any failCallbacks are
called with the given `context` as the `this` object, and the optional
array `args` as arguments.


## Examples

Invoke a callback function after a five-second delay:

```
$.timeout( 5000, $("#status"), "5 seconds" ).done(function( $e, msg ) { 
    $e.text( msg + " later..." ); 
});
```

Same as above, but pass the element as the context argument to
`deferredWith`:

```
$.timeoutWith( 5000, $("#status"), [ "5 seconds" ] ).done(function( msg ) { 
    this.text(msg + " later..."); 
});
```

Provide handlers to be called when the timeout is resolved (elapsed)
or rejected (cleared), and an event handler to manually clear the
timeout.
 
```
var timeout = $.timeout( 10000 );

timeout.then(
    function() { alert( "timeout elapsed" ) },
    function() { alert( "timeout cleared" ) }
);

$( "#clear" ).click(function() {
    timeout.clear();
});
```
