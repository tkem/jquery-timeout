/*
 * jQuery Timeout Plugin
 * https://github.com/tkem/jquery-timeout/
 *
 * Copyright (c) 2011-2014 Thomas Kemmer
 * Released under the MIT License
 * http://raw.github.com/tkem/jquery-timeout/master/MIT-LICENSE
 */
;(function($, window, undefined) {
    // private constructor function
    function Timeout(delay, deferred, context, args) {
        var callback = function() {
                deferred.resolveWith(context, args);
            },
            timeoutID = window.setTimeout(callback, delay);

        deferred.fail(function() {
            window.clearTimeout(timeoutID);
        });

        return $.extend(deferred.promise(), {
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
            var deferred = $.Deferred(),
                promise = deferred.promise(),
                args = $.makeArray(arguments).slice(1);
            return Timeout(delay, deferred, promise, args);
        },
        timeoutWith: function(delay, context, args) {
            return Timeout(delay, $.Deferred(), context, args);
        }
    });
})(jQuery, window);
