module( "jQuery.timeoutWith", {
    setup: function() {
        var $fixture = $( "#qunit-fixture" );
        $fixture.data( "resolve-context", { role: "resolve-context" } );
        $fixture.data( "resolve-args", [ "abc", 123, true ] );
        $fixture.data( "clear-context", { role: "clear-context" } );
        $fixture.data( "clear-args", [ "", 0 ] );
    }
});

asyncTest( "resolve timeout with zero delay", 1, function() {
    var $fixture = $( "#qunit-fixture" );
    var t = $.timeoutWith( 0, $fixture.data( "resolve-context" ) );
    t.done(function() {
        deepEqual( this, $fixture.data( "resolve-context" ) );
        start();
    });
});

asyncTest( "resolve timeout with one second delay", 2, function() {
    var $fixture = $( "#qunit-fixture" );
    var time = new Date().getTime();
    var t = $.timeoutWith( 1000, $fixture.data( "resolve-context" ) );
    t.done(function() {
        deepEqual( this, $fixture.data( "resolve-context" ) );
        ok( new Date().getTime() >= time + 1000 );
        start();
    });
});

asyncTest( "resolve timeout with context and args", 2, function() {
    var $fixture = $( "#qunit-fixture" );
    var t = $.timeoutWith( 
        0, 
        $fixture.data( "resolve-context" ), 
        $fixture.data( "resolve-args" ) 
    );
    t.done(function() {
        deepEqual( this, $fixture.data( "resolve-context" ) );
        deepEqual( $.makeArray( arguments ), $fixture.data( "resolve-args" ) );
        start();
    });
});

asyncTest( "clear timeout without args", 2, function() {
    var $fixture = $( "#qunit-fixture" );
    var t = $.timeoutWith( 
        86400000, 
        $fixture.data( "resolve-context" ), 
        $fixture.data( "resolve-args" ) 
    );
    t.fail(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        deepEqual( $.makeArray( arguments ), [] );
        start();
    });
    t.clear();
});

asyncTest( "clear timeout with args", 2, function() {
    var $fixture = $( "#qunit-fixture" );
    var t = $.timeoutWith( 
        86400000, 
        $fixture.data( "resolve-context" ), 
        $fixture.data( "resolve-args" ) 
    );
    t.fail(function() {
        deepEqual( this, t.promise ? t.promise() : t );
        deepEqual( $.makeArray( arguments ), $fixture.data( "clear-args" ) );
        start();
    });
    t.clear.apply( t, $fixture.data( "clear-args" ) );
});

asyncTest( "clear timeout with context and args", 2, function() {
    var $fixture = $( "#qunit-fixture" );
    var t = $.timeoutWith( 
        86400000, 
        $fixture.data( "resolve-context" ), 
        $fixture.data( "resolve-args" ) 
    );
    t.fail(function() {
        deepEqual( this, $fixture.data( "clear-context" ) );
        deepEqual( $.makeArray( arguments ), $fixture.data( "clear-args" ) );
        start();
    });
    t.clearWith( 
        $fixture.data( "clear-context" ), 
        $fixture.data( "clear-args" ) 
    );
});
