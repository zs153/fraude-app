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
          'dist/controllers/carga.controller.js': ['./dist/controllers/carga.controller.js'],
          'dist/controllers/estadistica.controller.js': ['./dist/controllers/estadistica.controller.js'],
          'dist/controllers/evento.controller.js': ['./dist/controllers/evento.controller.js'],
          'dist/controllers/fraude.controller.js': ['./dist/controllers/fraude.controller.js'],
          'dist/controllers/gente.controller.js': ['./dist/controllers/gente.controller.js'],          
          'dist/controllers/historico.controller.js': ['./dist/controllers/historico.controller.js'],
          'dist/controllers/hito.controller.js': ['./dist/controllers/hito.controller.js'],
          'dist/controllers/oficina.controller.js': ['./dist/controllers/oficina.controller.js'],
          'dist/controllers/relacion.controller.js': ['./dist/controllers/relacion.controller.js'],
          'dist/controllers/tipos.controller.js': ['./dist/controllers/tipos.controller.js'],
          'dist/controllers/usuario.controller.js': ['./dist/controllers/usuario.controller.js'],
          // models
          'dist/models/carga.models.js': ['./dist/models/carga.model.js'],
          'dist/models/estadistica.model.js': ['./dist/models/estadistica.model.js'],
          'dist/models/evento.model.js': ['./dist/models/evento.model.js'],
          'dist/models/fraude.model.js': ['./dist/models/fraude.model.js'],
          'dist/models/gente.model.js': ['./dist/models/gente.model.js'],
          'dist/models/historico.model.js': ['./dist/models/historico.model.js'],
          'dist/models/hito.model.js': ['./dist/models/hito.model.js'],
          'dist/models/oficina.model.js': ['./dist/models/oficina.model.js'],
          'dist/models/relacion.model.js': ['./dist/models/relacion.model.js'],
          'dist/models/tipos.model.js': ['./dist/models/tipos.model.js'],
          'dist/models/usuario.model.js': ['./dist/models/usuario.model.js'],
          // routes
          'dist/routes/carga.routes.js': ['./dist/routes/carga.router.js'],
          'dist/routes/estadistica.router.js': ['./dist/routes/estadistica.router.js'],
          'dist/routes/evento.router.js': ['./dist/routes/evento.router.js'],
          'dist/routes/fraude.router.js': ['./dist/routes/fraude.router.js'],
          'dist/routes/gente.router.js': ['./dist/routes/gente.router.js'],
          'dist/routes/historico.router.js': ['./dist/routes/historico.router.js'],          
          'dist/routes/hito.router.js': ['./dist/routes/hito.router.js'],
          'dist/routes/oficina.router.js': ['./dist/routes/oficina.router.js'],
          'dist/routes/relacion.router.js': ['./dist/routes/relacion.router.js'],
          'dist/routes/tipos.router.js': ['./dist/routes/tipos.router.js'],
          'dist/routes/usuario.router.js': ['./dist/routes/usuario.router.js'],
          // services
          'dist/services/database.js': ['./dist/services/database.js'],
          'dist/services/web-server.js': ['./dist/services/web-server.js'],
          // indice
          'dist/index.js': ['./dist/index.js'],
        }
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
};