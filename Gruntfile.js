'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('timeout.jquery.json'),

        copyright: '2011-<%= grunt.template.today("yyyy") %>',

        banner: '/*!\n' +
            ' * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= copyright %> <%= pkg.author.name %>\n' +
            ' * Released under the <%= pkg.licenses[0].type %> License\n' +
            ' * <%= pkg.licenses[0].url %>\n' +
            ' */\n',

        minbanner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | ' +
            '(c) <%= copyright %> <%= pkg.author.name %> | ' +
            '<%= pkg.licenses[0].type %> License */\n',

        clean: {
            files: ['dist']
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/jquery.<%= pkg.name %>.js'],
                dest: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= minbanner %>'
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/**/*.js']
            },
            tests: {
                src: ['tests/**/*.js']
            },
        },

        qunit: {
            files: ['tests/**/*.html']
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
            },
            tests: {
                files: '<%= jshint.tests.src %>',
                tasks: ['jshint:tests']
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('dist', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('test', ['jshint', 'qunit']);
};
