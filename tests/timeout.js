;(function($) {
    /* global QUnit: false */

    QUnit.module("jQuery.timeout");

    QUnit.asyncTest("resolve timeout with zero delay", 1, function(assert) {
        var t = $.timeout(0);
        t.done(function() {
            assert.deepEqual(this, t);
            QUnit.start();
        });
    });

    QUnit.asyncTest("resolve timeout with one second delay", 2, function(assert) {
        var now = $.now(),
            t = $.timeout(1000);
        t.done(function() {
            assert.ok($.now() >= now + 1000);
            assert.deepEqual(this, t);
            QUnit.start();
        });
    });

    QUnit.asyncTest("resolve timeout with args", 2, function(assert) {
        var t = $.timeout(0, "abc", 123);
        t.done(function() {
            assert.deepEqual(this, t);
            assert.deepEqual($.makeArray(arguments), ["abc", 123]);
            QUnit.start();
        });
    });

    QUnit.asyncTest("clear timeout without args", 1, function(assert) {
        var t = $.timeout(86400000);
        t.fail(function() {
            assert.deepEqual(this, t);
            QUnit.start();
        });
        t.clear();
    });

    QUnit.asyncTest("clear timeout with args", 2, function(assert) {
        var t = $.timeout(86400000);
        t.fail(function() {
            assert.deepEqual(this, t);
            assert.deepEqual($.makeArray(arguments), ["abc", 123]);
            QUnit.start();
        });
        t.clear("abc", 123);
    });

    QUnit.asyncTest("clear timeout with context and args", 2, function(assert) {
        var t = $.timeout(86400000);
        t.fail(function() {
            assert.deepEqual(this, $("#qunit-fixture"));
            assert.deepEqual($.makeArray(arguments), ["abc", 123]);
            QUnit.start();
        });
        t.clearWith($("#qunit-fixture"), ["abc", 123]);
    });

    QUnit.asyncTest("reset timeout", 2, function(assert) {
        var now = $.now(),
            t = $.timeout(1000);
        t.done(function() {
            assert.ok($.now() >= now + 1000);
            assert.deepEqual(this, t);
            QUnit.start();
        });
        t.reset();
    });

    QUnit.asyncTest("reset timeout with new delay", 1, function(assert) {
        var t = $.timeout(86400000);
        t.done(function() {
            assert.deepEqual(this, t);
            QUnit.start();
        });
        t.reset(0);
    });

    QUnit.asyncTest("reset timeout with updated delay", 1, function(assert) {
        var t = $.timeout(86400000);
        t.done(function() {
            assert.deepEqual(this, t);
            QUnit.start();
        });
        t.reset(1000);
        t.reset();
    });

})(jQuery);
