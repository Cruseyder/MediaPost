module.exports = function( grunt ) {

    // Configuração das tasks
    grunt.initConfig({
        // Sass
        sass:{
            target: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/style.min.css' : 'dev/scss/main.scss'
                }
            }
        },

        // TypeScript
        ts: {
            default: {
                tsconfig: true
            }
        },

        // Uglify
        uglify: {
            target: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/js/libs.min.js' : [
                        'dev/lib/*.js'
                    ]
                }
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: 'dev/scss/*.scss',
                tasks: 'sass'
            },
            html: {
                files: 'public/index.html'
            },
            typescript: {
                files: 'dev/ts/**/*',
                tasks: 'ts'
            },
            js: {
                files: 'dev/lib/*.js',
                tasks: 'uglify'
            }
        },

        // Connect
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    base: './public',
                    livereload: true,
                    open: true
                }
            }
        }
    });

    // Registro das tasks personalizadas
    grunt.registerTask( 'start', [ 'sass', 'ts', 'uglify', 'connect', 'watch'] );

    // Registro dos plugins do grunt
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-uglify');
}