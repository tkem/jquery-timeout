# [jQuery Timeout](https://github.com/tkem/jquery-timeout/)

**jQuery 1.5** introduced the _Deferred_ callback management system,
to ease handling callbacks for asynchronous events.  Although the
jQuery documentation contains examples on how to use deferred objects
with the native `window.setTimeout` and `window.clearTimeout`
functions, jQuery does not provide a simple interface for timer-based
deferreds by its own.

This plugin provides the two functions `jQuery.timeout` and
`jQuery.timeoutWith` that, given a delay in milliseconds, create a
`jQuery.Deferred` instance that will be resolved after the given
delay.  The returned _promise_ object also provides `clear` and
`clearWith` methods, which will reject the deferred object and clear
the native timeout ID, if called before the timeout has elapsed.


## API Documentation

### jQuery.timeout( delay [, args ] )

Return a Promise object that will be resolved after the given `delay`.

### jQuery.timeoutWith( delay, context [, args ] )

Return a Promise object that will be resolved after the given `delay`.

### timeout.clear( [ args ] )

Reject a Deferred timeout object.

### timeout.clearWith( context [, args ] )

Reject a Deferred timeout object.


## Examples

Invoke a callback function after a five-second delay:

```
      $.timeout(5000, $("#status"), "5 seconds").done(function($e, msg) { 
        $e.text(msg + " later..."); 
      });
```

Provide handlers to be called when the timeout is resolved (elapsed)
or rejected (cleared), and an event handler to manually clear the
timeout.
 
```
      var timeout = $.timeout(10000);

      timeout.then(
        function() { alert("timeout elapsed") },
        function() { alert("timeout cleared") }
      );

      $("#clear").click(function() {
        timeout.clear();
      });
```
