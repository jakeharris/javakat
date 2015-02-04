module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Project settings
    config: {
      assets: 'assets',
      views: 'views',
      master: 'views/layouts/default.hbs',
      dist: '.'
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.assets %>/styles/sass/{,*/}*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['<%= config.assets %>/scripts/{,*/}*.js'],
        tasks: ['jshint:all']
      },
      assemble: {
        files: ['<%= config.views %>/{,*/}/*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}views/*.hbs',
          '<%= config.assets %>/styles/{,*/}*.css',
          '<%= config.assets %>/scripts/{,*/}*.js'
        ]
      }
    },

    connect: {
      options: {
        port: 1107,
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {

      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/styles',
          src: ['*.scss'],
          dest: '<%= config.assets %>/styles/',
          ext: '.css'
        }]
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        asi: true
      },
      all: ['<%= config.assets %>/scripts/{,*/}*.js']
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          layout: '<%= config.master %>',
          data: '<%= config.assets %>/data/*.{json,yml}',
          partials: '<%= config.partials %>'
        },
        files: {
          './': ['<%= config.views %>/*.hbs']
        }
      }
    },

    express: {
      options: {
        livereload: true,
        bases: '.'
      }
    }

  });

  grunt.registerTask('default', ['auto']);
  grunt.registerTask('auto', [
    'build',
    'connect:livereload',
    'watch'
    ]);
  grunt.registerTask('build', [
    'sass',
    'jshint',
    'assemble'
  ]);
  grunt.registerTask('heroku:production', [
    'sass',
    'assemble'
  ]);


}
