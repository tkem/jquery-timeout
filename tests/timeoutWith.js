module( "jQuery.timeoutWith" );

asyncTest( "resolve timeout with zero delay", 1, function() {
    var context = $( "#qunit-fixture" );
    var t = $.timeoutWith( 0, context );
    t.done(function() {
        deepEqual( this, context );
        start();
    });
});

asyncTest( "resolve timeout with one second delay", 2, function() {
    var context = $( "#qunit-fixture" );
    var time = new Date().getTime();
    var t = $.timeoutWith( 1000, context );
    t.done(function() {
        deepEqual( this, context );
        ok( new Date().getTime() >= time + 1000 );
        start();
    });
});

asyncTest( "resolve timeout with context and args", 2, function() {
    var context = $( "#qunit-fixture" );
    var args = [ "abc", 123 ];
    var t = $.timeoutWith( 0, context, args );
    t.done(function() {
        deepEqual( this, context );
        deepEqual( $.makeArray( arguments ), args );
        start();
    });
});

asyncTest( "clear timeout without args", 2, function() {
    var context = $( "#qunit-fixture" );
    var args = [ "abc", 123 ];
    var t = $.timeoutWith( 86400000, context, args );
    t.fail(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        deepEqual( $.makeArray( arguments ), [] );
        start();
    });
    t.clear();
});

asyncTest( "clear timeout with args", 2, function() {
    var context = $( "#qunit-fixture" );
    var args = [ "abc", 123 ];
    var t = $.timeoutWith( 86400000, context, args );
    t.fail(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        deepEqual( $.makeArray( arguments ), [ "xyz", 42 ] );
        start();
    });
    t.clear( "xyz", 42 );
});

asyncTest( "clear timeout with context and args", 2, function() {
    var context = $( "#qunit-fixture" );
    var args = [ "abc", 123 ];
    var t = $.timeoutWith( 86400000, context, args );
    t.fail(function() {
        deepEqual( this, { foo: "bar" } );
        deepEqual( $.makeArray( arguments ), [ "xyz", 42 ] );
        start();
    });
    t.clearWith( { foo: "bar" }, [ "xyz", 42 ] );
});
