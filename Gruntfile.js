var path = require('path');

module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server'
  });

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
        files: ['<%= config.assets %>/sass/styles/{,*/}*.scss'],
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
          livereload: '<%= express.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}views/*.hbs',
          '<%= config.assets %>/styles/{,*/}*.css',
          '<%= config.assets %>/scripts/{,*/}*.js'
        ]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/sass/styles',
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
        port: 1107
      },
      server: {
        script: 'bin/www'
      }
    }

  });

  grunt.registerTask('default', ['auto']);
  grunt.registerTask('auto', [
    'build',
    'watch'
    ]);
  grunt.registerTask('build', [
    'sass',
    'jshint',
    'assemble'
  ]);


}
