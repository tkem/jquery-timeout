module( "jQuery.timeout" );

asyncTest( "resolve timeout with zero delay", 1, function() {
    var t = $.timeout( 0 );
    t.done(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        start();
    });
});

asyncTest( "resolve timeout with one second delay", 2, function() {
    var time = new Date().getTime();
    var t = $.timeout( 1000 );
    t.done(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        ok( new Date().getTime() >= time + 1000 );
        start();
    });
});

asyncTest( "resolve timeout with args", 2, function() {
    var t = $.timeout( 0, "abc", 123 );
    t.done(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        deepEqual( $.makeArray( arguments ), [ "abc", 123 ] );
        start();
    });
});

asyncTest( "clear timeout without args", 1, function() {
    var t = $.timeout( 86400000 );
    t.fail(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        start();
    });
    t.clear();
});

asyncTest( "clear timeout with args", 2, function() {
    var t = $.timeout( 86400000 );
    t.fail(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        deepEqual( $.makeArray( arguments ), [ "abc", 123 ] );
        start();
    });
    t.clear( "abc", 123 );
});

asyncTest( "clear timeout with context and args", 2, function() {
    var t = $.timeout( 86400000 );
    t.fail(function() {
        deepEqual( this, $( "#qunit-fixture" ) );
        deepEqual( $.makeArray( arguments ), [ "abc", 123 ] );
        start();
    });
    t.clearWith( $( "#qunit-fixture" ), [ "abc", 123 ] );
});
