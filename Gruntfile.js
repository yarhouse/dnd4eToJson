// Generated on 2017-07-04 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'


var fullToAbrv = {
    'Charisma'      : 'Cha',
    'Constitution'  : 'Con',
    'Dexterity'     : 'Dex',
    'Intelligence'  : 'Int',
    'Strength'      : 'Str',
    'Wisdom'        : 'Wis'
}
var abrvToFull = {
    'Cha' : 'Charisma',
    'Con' : 'Constitution',
    'Dex' : 'Dexterity',
    'Int' : 'Intelligence',
    'Str' : 'Strength',
    'Wis' : 'Wisdom'
}


//MODIFIED: add require for connect-modewrite
var modRewrite = require('connect-modrewrite');

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // https://github.com/angular/angular.js/issues/13794#issuecomment-192049906
    require('phantomjs-polyfill');
    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn'
    });

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: grunt.option('outputDirectory') || 'dist'
    };
    grunt.loadNpmTasks('grunt-ng-constant');
    // http://stackoverflow.com/a/23718127/1309103
    grunt.loadNpmTasks('grunt-contrib-less');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: [
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    // '<%= yeoman.app %>/widgets/{,*/}*.js'  // >>>>>>>>>> How to use nonstandard folders
                    ],
                tasks: ['newer:jshint:all', 'newer:jscs:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less:server', 'autoprefixer-core']
            },
            // styles: {
            //     files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
            //     tasks: ['newer:copy:styles', 'postcss']
            // },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    // '<%= yeoman.app %>/widgets/{,*/}*.html',  // >>>>>>>>>> How to use nonstandard folders
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 8042,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 9042
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        // // Original
                        // return [
                        //   connect.static('.tmp'),
                        //   connect().use(
                        //     '/bower_components',
                        //     connect.static('./bower_components')
                        //   ),
                        //   connect().use(
                        //     '/app/styles',
                        //     connect.static('./app/styles')
                        //   ),
                        //   connect.static(appConfig.app)
                        // ];


                        // https://gist.github.com/nnarhinen/7719157#gistcomment-1311717
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect().use(
                                '/fonts',
                                connect.static('./bower_components/font-awesome/fonts')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    // '<%= yeoman.app %>/widgets/{,*/}*.js'  // >>>>>>>>>> How to use nonstandard folders
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Make sure code styles are up to par
        jscs: {
            options: {
                config: '.jscsrc',
                verbose: true
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js',
                    // '<%= yeoman.app %>/widgets/{,*/}*.js'  // >>>>>>>>>> How to use nonstandard folders
                ]
            },
            test: {
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: ['last 1 version']})
                ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath:  /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath:  /\.\.\//,
                fileTypes:{
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                            detect: {
                                js: /'(.*\.js)'/gi
                            },
                            replace: {
                                js: '\'{{filePath}}\','
                            }
                        }
                    }
            },
            less: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        // Compiles LESS to CSS and generates necessary files if requested
        less: {
            options: {
                paths: ['./bower_components'],
            },
            dist: {
                options: {
                    cleancss: true,
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: '*.less',
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            },
            server: {
                options: {
                    sourceMap: true,
                    sourceMapBasepath: '<%= yeoman.app %>/',
                    sourceMapRootpath: '../'
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: '*.less',
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    // '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    // '<%= yeoman.dist %>/styles/{,*/}*.css',
                    // '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    // '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles'
                ],
                patterns: {
                    js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        ngtemplates: {
            dist: {
                options: {
                    module: 'dnd4eToJsonApp',
                    htmlmin: '<%= htmlmin.dist.options %>',
                    usemin: 'scripts/scripts.js'
                },
                cwd: '<%= yeoman.app %>',
                src: [
                    'views/{,*/}*.html',
                    // 'widgets/{,*/}*.html'  // >>>>>>>>>> How to use nonstandard folders
                ],
                dest: '.tmp/templateCache.js'
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'styles/{,*/}*.css',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome/',
                    // cwd: '.', // originl
                    // src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*', // Old Sass
                    // src: 'bower_components/font-awesome/fonts/*',
                    src: 'fonts/{,*/}*.*',
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: '.well-known/*'
                }]
            },
            // Custom build, use with `grunt custom --target=customProd`
            // to fire off the task grunt.registerTask('custom') towards the end of this file
            // Kinda pre-configured to create a build of the app that only
            // requires basic browser tools; HTML, CSS, JS.
            // Basically a simple export to create a drop-in app/website
            custom: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '../custom_folder', // >>>>>>>>>> Rename this custom directory
                    // dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{txt}',
                        '*.html',
                        'index.html',
                        // 'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*',
                        // 'styles/{,*/}*.*',
                        'views/{,*/}*.*',
                        'scripts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower.json',
                    dest: '../custom_folder'  // >>>>>>>>>> Rename this custom directory
                }, {
                    expand: true,
                    cwd: '.tmp/styles',
                    src: '{,*/}*.css',
                    dest: '../custom_folder/styles/'  // >>>>>>>>>> Rename this custom directory
                }, {
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    dest: '../custom_folder/images',  // >>>>>>>>>> Rename this custom directory
                    src: [
                        'nass-brand.png',  // >>>>>>>>>> Name each image you want copied...
                        'user.png'  // >>>>>>>>>> Name each image you want copied...
                    ]
                    // src: '{,*/}*.{png,jpg,jpeg,gif,webp,svg}' // >>>>>>>>>> ...Or use this for all images

                // // THere are no default 'widgets', use this as a template for copying from
                // // a custom made /app/directory
                // }, {
                //     expand: true,
                //     cwd: '<%= yeoman.app %>/widgets',
                //     dest: '../custom_folder/widgets',  // >>>>>>>>>> Rename this custom directory
                //     src: [
                //         'boolean.*',
                //         'calculation.*',
                //         'decimal.*',
                //         'group.*',
                //         'integer.*',
                //         'nassCustomSelect.*',
                //         'nassSkipToSection.*',
                //         'remark.*',
                //         'selectNumber.*',
                //         'selectString.*',
                //         'string.*',
                //         'textArea.*'
                //     ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'less:server'
            ],
            test: [],
            dist: [
                'less:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        // http://stackoverflow.com/a/18343298/1309103
        ngconstant: {
            options: {
                name: 'config',
                wrap: '\'use strict\';\n\n{%= __ngModule %}',
                space: '  '
            },
            // standard development
            development: {
                options: {
                    dest: '<%= yeoman.app %>/scripts/config.js'
                },
                constants: {
                    STAT_FULL_2_ABRV: fullToAbrv,
                    STAT_ABRV_2_FULL: abrvToFull,

                    // IFRAME_HOST_PATH: 'http://localhost:8228',
                    // TENANT_ID: '6',
                    // STATIC_FEATURED_CATEGORYID: '8',
                    // DEFAULT_MARKET_COUNT: '8',
                    // DEFAULT_CONTENT_SIZE: '4',
                    // STATIC_DOMAIN_ID: '1',
                    // STATIC_CONTAINER_ID: '1',
                    // STATIC_MARKET_ID: '2',
                    // STATIC_CLIENT_ID: '9',
                    // STATIC_CLIENT_SECRET: 'rl1qtf0ubanlf72rajgfh7g11p',
                    // IDENTITY_URI: 'http://localhost:8220',
                    // TOKEN_URI: 'http://localhost:8220/oauth/token',
                    // AUTHORIZE_URI: 'http://localhost:8220/oauth/authorize',
                    // INSTRUCTOR_LINKS : instructorsObjectBundles,


                    // IFRAME_HOST_PATH: 'https://markets.allogy.com',
                    // TENANT_ID: '8',
                    // DEFAULT_MARKET_COUNT: '8',
                    // DEFAULT_CONTENT_SIZE: '4',
                    // STATIC_DOMAIN_ID: '3',
                    // STATIC_CONTAINER_ID: '2',
                    // STATIC_MARKET_ID: '11',
                    // STATIC_FEATURED_CATEGORYID: '8',
                    // STATIC_CLIENT_ID: '17',
                    // STATIC_CLIENT_SECRET: 'suc2nqk94c9gbc6s0bel0cch0i',
                    // IDENTITY_URI: 'https://identity.allogy.com',
                    // TOKEN_URI: 'https://identity.allogy.com/oauth/token',
                    // AUTHORIZE_URI: 'https://identity.allogy.com/oauth/authorize',
                    // INSTRUCTOR_LINKS : instructorsObjectBundles,
                }
            },
            // standard production
            production: {
                options: {
                    dest: '<%= yeoman.app %>/scripts/config.js'
                },
                constants: {
                    STAT_FULL_2_ABRV: fullToAbrv,
                    STAT_ABRV_2_FULL: abrvToFull,
                    // IFRAME_HOST_PATH: 'https://markets.allogy.com',
                    // TENANT_ID: '8',
                    // DEFAULT_MARKET_COUNT: '8',
                    // DEFAULT_CONTENT_SIZE: '4',
                    // STATIC_DOMAIN_ID: '3',
                    // STATIC_CONTAINER_ID: '2',
                    // STATIC_MARKET_ID: '11',
                    // STATIC_FEATURED_CATEGORYID: '8',
                    // STATIC_CLIENT_ID: '17',
                    // STATIC_CLIENT_SECRET: 'suc2nqk94c9gbc6s0bel0cch0i',
                    // IDENTITY_URI: 'https://identity.allogy.com',
                    // TOKEN_URI: 'https://identity.allogy.com/oauth/token',
                    // AUTHORIZE_URI: 'https://identity.allogy.com/oauth/authorize',
                    // INSTRUCTOR_LINKS : instructorsObjectBundles,
                }
            },
            // // Custom development settings
            // customDev: {
            //     options: {
            //         dest: '<%= yeoman.app %>/scripts/config.js'
            //     },
            //     constants: {
            //         TENANT_ID: 'BILLY_GOATS'
            //     }
            // },
            // // Custom production settings
            // customProd: {
            //     options: {
            //         dest: '<%= yeoman.app %>/scripts/config.js'
            //     },
            //     constants: {
            //         TENANT_ID: 'BILLY_GOATS'
            //     }
            // }
        }
    });

    // grunt build --target=customProd
    // I added 2 vars here, so that IF there is no target option passed,
    // each version (serve or build) will have the correct OR property.
    var serveOption = grunt.option('target') || 'development';
    var buildOption = grunt.option('target') || 'production';

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'less',
            'ngconstant:'+serveOption,
            'concurrent:server',
            'postcss:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep',
        'less',
        'ngconstant:'+serveOption,
        'concurrent:test',
        'postcss',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'less',
        'ngconstant:'+buildOption,
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    // this task is for building only, to distribute a version that is easily droppped into a website
    // grunt custom
    // grunt custom --target=customProd
    grunt.registerTask('custom', [
        'clean:dist',
        'wiredep',
        'less',
        'ngconstant:'+buildOption,
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'copy:custom', // This is the custom copy to move files
        'cssmin',
        'usemin',
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'newer:jscs',
        'test',
        'build'
    ]);
};
