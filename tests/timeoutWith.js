;(function($) {
    /* global QUnit: false */

    QUnit.module("jQuery.timeoutWith", {
        setup: function() {
            var $fixture = $("#qunit-fixture");
            $fixture.data("resolve-context", {role: "resolve-context"});
            $fixture.data("resolve-args", ["abc", 123, true]);
            $fixture.data("clear-context", {role: "clear-context"});
            $fixture.data("clear-args", ["", 0]);
        }
    });

    QUnit.asyncTest("resolve timeout with zero delay", 1, function(assert) {
        var $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(0, $fixture.data( "resolve-context"));
        t.done(function() {
            assert.deepEqual(this, $fixture.data( "resolve-context"));
            QUnit.start();
        });
    });

    QUnit.asyncTest("resolve timeout with one second delay", 2, function(assert) {
        var now = $.now(),
            $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(1000, $fixture.data("resolve-context"));
        t.done(function() {
            assert.ok($.now() >= now + 1000);
            assert.deepEqual(this, $fixture.data("resolve-context"));
            QUnit.start();
        });
    });

    QUnit.asyncTest("resolve timeout with context and args", 2, function(assert) {
        var $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(
                0,
                $fixture.data("resolve-context"),
                $fixture.data("resolve-args")
            );
        t.done(function() {
            assert.deepEqual(this, $fixture.data("resolve-context"));
            assert.deepEqual($.makeArray(arguments), $fixture.data("resolve-args"));
            QUnit.start();
        });
    });

    QUnit.asyncTest("resolve timeout with empty string context", 1, function(assert) {
        $.timeoutWith(0, "").done(function() {
            assert.equal(this, "");
            QUnit.start();
        });
    });

    QUnit.asyncTest("resolve timeout with zero (0) context", 1, function(assert) {
        $.timeoutWith(0, 0).done(function() {
            assert.equal(this, 0);
            QUnit.start();
        });
    });

    QUnit.asyncTest("clear timeout without args", 2, function(assert) {
        var $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(
                86400000,
                $fixture.data("resolve-context"),
                $fixture.data("resolve-args")
            );
        t.fail(function() {
            assert.deepEqual(this, t);
            assert.deepEqual($.makeArray(arguments), []);
            QUnit.start();
        });
        t.clear();
    });

    QUnit.asyncTest("clear timeout with args", 2, function(assert) {
        var $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(
                86400000,
                $fixture.data("resolve-context"),
                $fixture.data("resolve-args")
            );
        t.fail(function() {
            assert.deepEqual(this, t);
            assert.deepEqual($.makeArray(arguments), $fixture.data("clear-args"));
            QUnit.start();
        });
        t.clear.apply(t, $fixture.data("clear-args"));
    });

    QUnit.asyncTest("clear timeout with context and args", 2, function(assert) {
        var $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(
                86400000,
                $fixture.data("resolve-context"),
                $fixture.data("resolve-args")
            );
        t.fail(function() {
            assert.deepEqual(this, $fixture.data("clear-context"));
            assert.deepEqual($.makeArray(arguments), $fixture.data("clear-args"));
            QUnit.start();
        });
        t.clearWith(
            $fixture.data("clear-context"),
            $fixture.data("clear-args")
        );
    });

    QUnit.asyncTest("reset timeout", 2, function(assert) {
        var now = $.now(),
            $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(1000, $fixture.data("resolve-context"));
        t.done(function() {
            assert.ok($.now() >= now + 1000);
            assert.deepEqual(this, $fixture.data("resolve-context"));
            QUnit.start();
        });
        t.reset();
    });

    QUnit.asyncTest("reset timeout with new delay", 1, function(assert) {
        var $fixture = $("#qunit-fixture"),
            t = $.timeoutWith(86400000, $fixture.data("resolve-context"));
        t.done(function() {
            assert.deepEqual(this, $fixture.data( "resolve-context"));
            QUnit.start();
        });
        t.reset(0);
    });

})(jQuery);
