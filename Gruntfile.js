'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      src: ['dist']
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      css: {
        src: ['src/public/css/*.css'],
        dest: 'src/public/css/styles.css'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: ['./src/views/admin/cargas/indexCargas.js'],
        dest: './src/public/js/indexCargas.min.js'
      },
      css: {
        src: 'src/public/css/styles.css',
        dest: 'src/public/css/styles.min.css'
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('default-js', ['uglify:js']);
  grunt.registerTask('default-css', ['uglify:css']);
  grunt.registerTask('concat-css', ['concat:css']);

};