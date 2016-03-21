// develop path: "./"
// build path:  "dist"

// task order
//- Clean dist directory
//- Copy file to dist directory
//- Compile less, sass, coffee script into dist directory
//- Concat css, js both to be single file in dist directory
//- Compressor css and js file in dist directory
//- Injector css and js file to html

module.exports = function (grunt){
    // auto-load npm task components
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),

        // clean directory
        clean: {
            build: ["dist"]
        },

        // copy file to dist directory
        copy: {
            build: {
                files: [
                    {
                        src: [ 'public/**'],
                        dest: 'dist/',
                        expand: true
                    }
                ]
            }
        },

        // less compiler
        less: {
            build: {
                expand: true,
                cwd: 'public/assets/stylesheets/',
                src: ['*.less'],
                dest: 'dist/public/assets/stylesheets',
                ext: '.css'
            }
        },

        // concat and compressor css
        cssmin: {
            build: {
                files: [{
                    'dist/public/assets/stylesheets/main.min.css': ['public/assets/stylesheets/*.css', 'dist/public/assets/stylesheets/*.css']
                }]
            }
        },

        // concat js
        concat: {
            build: {
                src:'public/assets/scripts/placeholder.js',
                dest:'dist/public/assets/scripts/placeholder.js'
            }
        },

        // compressor js
        uglify: {
            build: {
                src:['public/assets/scripts/*.js', '!public/assets/scripts/less.min.js'],
                dest:'dist/public/assets/scripts/main.min.js'
            }
        },

        // injector js and css files to html
        injector: {
            options: {
                // Task-specific options go here.
            },
            css: {
                options: {
                    relative: true,
                    transform: function (filePath){
                        var filePath = filePath.replace('/dist/public/', '');
                        return '<link rel="stylesheet" href="' + filePath + '" />';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    'dist/public/index.html': ['dist/public/assets/stylesheets/main.min.css']
                }
            }
            //,
            //scripts: {
            //    options: {
            //        relative: true,
            //        transform: function (filePath){
            //            var filePath = filePath.replace('/dist/public/', '');
            //            return '<script src="' + filePath + '"></script>';
            //        },
            //        starttag: '<!-- injector:js -->',
            //        endtag: '<!-- endinjector -->'
            //    },
            //    files: {
            //        'dist/public/index.html': ['dist/public/assets/scripts/*.js']
            //    }
            //}
        },

        'string-replace': {
            deploy: {
                files: [{
                    expand: true,
                    cwd: 'dist/public/',
                    src: '*.html',
                    dest: 'dist/public/'
                }],
                options: {
                    replacements: [{
                        //  remove livereload
                        pattern: /<script src="\/\/localhost:35729\/livereload.js"><\/script>/ig,
                        replacement: ''
                    },
                        {
                            //  remove less compiler
                            pattern: /<script src="assets\/scripts\/less.min.js"><\/script>/ig,
                            replacement: ''
                        },
                        {
                            //  replace link tag's rel="stylesheet/less" to rel="stylesheet"
                            pattern: /stylesheet\/less/ig,
                            replacement: 'stylesheet'
                        },
                        {
                            //  replace .less extension to .css extension
                             pattern: /.less"\/>/ig,
                            replacement: '.css"/>'
                        }]
                }
            }
        },

        watch: {
            css: {
                files: 'public/assets/stylesheets/**',
                options: {
                    livereload: true
                }
            },
            js: {
                files: 'public/assets/scripts/**',
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['*.html', '**/*.html', '**/**/*.html'],
                options: {
                    livereload: true
                }
            }
        },

        pagespeed: {
            options: {
                nokey: true,
                url: "https://developers.google.com"
            },
            prod: {
                options: {
                    url: "http://localhost:63342/siso_angular/dist/public/index.html#/home",
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 80
                }
            }
        }


    });

    // define task
    grunt.registerTask('cleanDir', ['clean:build']); //ok
    grunt.registerTask('copyFileToDist', ['copy:build']); //ok
    grunt.registerTask('compileLess', ['less:build']); //ok
    grunt.registerTask('concatCompressorCss', ['cssmin:build']); //ok
    grunt.registerTask('makeJs', ['concat:build', 'uglify:build']); //ok
    grunt.registerTask('injectFileToHtml', ['injector']); //ok
    grunt.registerTask('removeUnuseFile', ['string-replace:deploy']); //ok
    grunt.registerTask('testPageSpeed', ['pagespeed:prod']); //ok
    // main task
    //grunt.registerTask('deploy', ['cleanDir', 'copyFileToDist', 'compileLess', 'concatCompressorCss', 'makeJs', 'injectFileToHtml']);
    grunt.registerTask('deploy', ['cleanDir', 'copyFileToDist', 'compileLess','cssmin', 'injectFileToHtml', 'removeUnuseFile']);
    grunt.registerTask('live', ['watch']);


};