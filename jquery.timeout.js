/*!
 * jQuery Timeout Plugin
 * http://plugins.jquery.com/timeout/
 *
 * Copyright (c) 2011-2013 Thomas Kemmer <tkemmer@computer.org>
 * Released under the MIT license
 * http://github.com/tkem/jquery-timeout/blob/master/MIT-LICENSE.txt
 */
;(function( $, window, document, undefined ) {
    // private constructor function
    function Timeout( delay, func ) {
        var deferred = $.Deferred(function( deferred ) {
            deferred.timeoutID = window.setTimeout(function() {
                func.call( deferred, deferred );
            }, delay);
            deferred.fail(function() {
                window.clearTimeout( deferred.timeoutID );
            });
        });
        return deferred.promise({
            clear: function() {
                deferred.reject.apply( deferred, arguments );
            },
            clearWith: function( context, args ) {
                deferred.rejectWith( context, args );
            }
        });
    }

    $.extend($, {
        timeout: function( delay ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            return Timeout( delay, function( deferred ) {
                deferred.resolve.apply( deferred, args );
            });
        },
        timeoutWith: function( delay, context, args ) {
            return Timeout( delay, function( deferred ) {
                deferred.resolveWith( context, args );
            });
        }
    });
})( jQuery, window, document );
