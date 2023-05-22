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
        src: ['src/public/css/estilos.css', 'src/public/css/navbar.css'],
        dest: 'src/public/css/concat.css'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        files: {
          // config
          'dist/config/settings.js': ['./dist/config/settings.js'],
          // controllers
          'dist/controllers/curso.controller.js': ['./dist/controllers/curso.controller.js'],
          'dist/controllers/estado.controller.js': ['./dist/controllers/estado.controller.js'],
          'dist/controllers/festivo.controller.js': ['./dist/controllers/festivo.controller.js'],
          'dist/controllers/formacion.controller.js': ['./dist/controllers/formacion.controller.js'],
          'dist/controllers/historico.controller.js': ['./dist/controllers/historico.controller.js'],
          'dist/controllers/matricula.controller.js': ['./dist/controllers/matricula.controller.js'],
          'dist/controllers/oficina.controller.js': ['./dist/controllers/oficina.controller.js'],
          'dist/controllers/usuario.controller.js': ['./dist/controllers/usuario.controller.js'],
          // models
          'dist/models/curso.models.js': ['./dist/models/curso.model.js'],
          'dist/models/estado.model.js': ['./dist/models/estado.model.js'],
          'dist/models/festivo.model.js': ['./dist/models/festivo.model.js'],
          'dist/models/formacion.model.js': ['./dist/models/formacion.model.js'],
          'dist/models/historico.model.js': ['./dist/models/historico.model.js'],
          'dist/models/matricula.model.js': ['./dist/models/matricula.model.js'],
          'dist/models/oficina.model.js': ['./dist/models/oficina.model.js'],
          'dist/models/usuario.model.js': ['./dist/models/usuario.model.js'],
          // routes
          'dist/routes/curso.routes.js': ['./dist/routes/curso.router.js'],
          'dist/routes/estado.router.js': ['./dist/routes/estado.router.js'],
          'dist/routes/festivo.router.js': ['./dist/routes/festivo.router.js'],
          'dist/routes/formacion.router.js': ['./dist/routes/formacion.router.js'],
          'dist/routes/historico.router.js': ['./dist/routes/historico.router.js'],
          'dist/routes/matricula.router.js': ['./dist/routes/matricula.router.js'],
          'dist/routes/oficina.router.js': ['./dist/routes/oficina.router.js'],
          'dist/routes/usuario.router.js': ['./dist/routes/usuario.router.js'],
          // services
          'dist/services/database.js': ['./dist/services/database.js'],
          'dist/services/web-server.js': ['./dist/services/web-server.js'],
          // indice
          'dist/index.js': ['./dist/index.js'],
        }
        // src: ['./dist/models/usuario.model.js'],
        // dest: './dist/models/usuario.model.js'
      },
      css: {
        src: 'src/public/css/concat.css',
        dest: 'src/public/css/card-stamp.min.css'
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
  grunt.registerTask('default-css', ['concat:css', 'uglify:css']);
  grunt.registerTask('concat-css', ['concat:css']);
  grunt.registerTask('default-uglify-css', ['uglify:css'])
};