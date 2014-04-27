/*
 * jQuery Timeout Plugin
 * https://github.com/tkem/jquery-timeout/
 *
 * Copyright (c) 2011-2014 Thomas Kemmer <tkemmer@computer.org>
 * Released under the MIT license
 * http://raw.github.com/tkem/jquery-timeout/master/MIT-LICENSE
 */
;(function( $, window, undefined ) {
    // private constructor function
    function Timeout( delay, context, args ) {
        var deferred = $.Deferred(),
            promise = deferred.promise(),
            func = function() {
                deferred.resolveWith( context || promise, args );
            },
            timeoutID = window.setTimeout( func, delay );

        deferred.fail(function() {
            window.clearTimeout( timeoutID );
        });

        return $.extend( promise, {
            clear: function() {
                deferred.rejectWith( this, arguments );
                return this;
            },
            clearWith: function( context, args ) {
                deferred.rejectWith( context, args );
                return this;
            },
            reset: function( newDelay ) {
                if ( this.state() === "pending" ) {
                    window.clearTimeout( timeoutID );
                    if ( newDelay !== undefined ) {
                        timeoutID = window.setTimeout( func, newDelay );
                    } else {
                        timeoutID = window.setTimeout( func, delay );
                    }
                }
                return this;
            }
        });
    }

    $.extend({
        timeout: function( delay ) {
            return Timeout( delay, undefined, $.makeArray( arguments ).slice( 1 ) );
        },
        timeoutWith: function( delay, context, args ) {
            return Timeout( delay, context, args );
        }
    });
})( jQuery, window );
