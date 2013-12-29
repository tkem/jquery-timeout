/*!
 * jQuery Timeout Plugin
 * http://plugins.jquery.com/timeout/
 *
 * Copyright (c) 2011-2013 Thomas Kemmer <tkemmer@computer.org>
 * Released under the MIT license
 * http://github.com/tkem/jquery-timeout/blob/master/MIT-LICENSE.txt
 */
;(function( $, window, undefined ) {
    // private constructor function
    function Timeout( delay, context, args ) {
        var deferred = $.Deferred(),
            promise = deferred.promise({
                clear: function() {
                    deferred.rejectWith( this, arguments );
                },
                clearWith: function( context, args ) {
                    deferred.rejectWith( context, args );
                }
            }),
            timeoutID = window.setTimeout(function() {
                deferred.resolveWith( context || promise, args );
            }, delay);

        deferred.fail(function() {
            window.clearTimeout( timeoutID );
        });

        return promise;
    }

    $.extend({
        timeout: function( delay ) {
            var args = $.makeArray( arguments ).slice( 1 );
            return Timeout( delay, undefined, args );
        },
        timeoutWith: function( delay, context, args ) {
            return Timeout( delay, context, args );
        }
    });
})( jQuery, window );
