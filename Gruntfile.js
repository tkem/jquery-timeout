module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        copyright: "(c) 2011-<%= grunt.template.today('yyyy') %>",

        clean: {
            files: ["dist"]
        },

        concat: {
            dist: {
                options: {
                    banner: "/*!\n" +
                        " * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n" +
                        " * <%= pkg.homepage %>\n" +
                        " *\n" +
                        " * Copyright <%= copyright %> <%= pkg.author.name %>.\n" +
                        " * Released under the <%= pkg.license %> License.\n" +
                        " */\n",
                    stripBanners: true
                },
                src: ["src/jquery.timeout.js"],
                dest: "dist/jquery.timeout.js"
            },
            plugin: {
                options: {
                    process: true
                },
                src: ["src/plugin.json"],
                dest: "timeout.jquery.json"
            },
            bower: {
                options: {
                    process: true
                },
                src: ["src/bower.json"],
                dest: "bower.json"
            }
        },

        uglify: {
            options: {
                banner: "/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> | " +
                    "<%= copyright %> <%= pkg.author.name %> | " +
                    "<%= pkg.license %> License */\n"
            },
            dist: {
                src: ["<%= concat.dist.dest %>"],
                dest: "dist/jquery.timeout.min.js"
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            grunt: {
                files: {
                    src: ["Gruntfile.js"]
                }
            },
            src: {
                files: {
                    src: ["src/**/*.js"]
                }
            },
            dist: {
                files: {
                    src: ["dist/jquery.timeout.js"]
                }
            },
            tests: {
                files: {
                    src: ["tests/**/*.js"]
                }
            }
        },

        qunit: {
            files: ["tests/**/*.html"]
        },

        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:grunt"]
            },
            src: {
                files: "<%= jshint.src.src %>",
                tasks: ["jshint:src"]
            },
            tests: {
                files: "<%= jshint.tests.src %>",
                tasks: ["jshint:tests"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("dist", ["concat", "uglify"]);
    grunt.registerTask("lint", ["jshint:grunt", "jshint:src", "jshint:tests"]);
    grunt.registerTask("test", ["qunit"]);
    grunt.registerTask("default", ["dist", "jshint:dist"]);
};
