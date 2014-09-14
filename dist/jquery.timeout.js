/*!
 * jQuery Timeout Plugin v1.3.4
 * http://github.com/tkem/jquery-timeout/
 *
 * Copyright (c) 2011-2014 Thomas Kemmer.
 * Released under the MIT License.
 */
;(function($, window, undefined) {
    // private constructor function
    function Timeout(delay, context, args) {
        var deferred = $.Deferred(),
            promise = deferred.promise(),
            callback = function() {
                deferred.resolveWith(context || promise, args);
            },
            timeoutID = window.setTimeout(callback, delay);

        deferred.fail(function() {
            window.clearTimeout(timeoutID);
        });

        return $.extend(promise, {
            clear: function() {
                deferred.rejectWith(this, arguments);
                return this;
            },
            clearWith: function(context, args) {
                deferred.rejectWith(context, args);
                return this;
            },
            reset: function(newDelay) {
                if (this.state() === "pending") {
                    window.clearTimeout(timeoutID);
                    if (newDelay !== undefined) {
                        timeoutID = window.setTimeout(callback, newDelay);
                    } else {
                        timeoutID = window.setTimeout(callback, delay);
                    }
                }
                return this;
            }
        });
    }

    $.extend({
        timeout: function(delay) {
            return Timeout(delay, undefined, $.makeArray(arguments).slice(1));
        },
        timeoutWith: function(delay, context, args) {
            return Timeout(delay, context, args);
        }
    });
})(jQuery, window);
