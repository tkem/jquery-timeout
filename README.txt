jquery.timeout - jQuery.Deferred Wrapper for setTimeout/clearTimeout
====================================================================

jQuery 1.5 introduced the Deferred callback management system, to ease
handling callbacks for asynchronous events.  Although the jQuery
documentation contains examples on how to use Deferred objects with
the native window.setTimeout and window.clearTimeout functions, jQuery
does not provide a simple interface for timer-based Deferreds by its
own.

This plugin provides a single function jQuery.timeout that, given a
delay in milliseconds, creates a jQuery.Deferred instance that will be
resolved after the given delay.  The returned promise object also
provides a clear method, which will reject the Deferred object and
clear the native timeout ID if called before the timeout has elapsed.
