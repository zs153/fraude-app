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
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'src/public/css/styles.css': ['src/public/css/estilos.css', 'src/public/css/navbar.css']
        }
      }
    },    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        files: {
          // bin
          'dist/bin/www.js': ['./dist/bin/www.js'],
          // config
          'dist/config/settings.js': ['./dist/config/settings.js'],
          // controllers
          'dist/controllers/admin/admin.controller.js':['./dist/controllers/admin/admin.controller.js'],
          'dist/controllers/admin/carga.controller.js':     ['./dist/controllers/admin/carga.controller.js'],
          'dist/controllers/admin/estadistica.controller.js':   ['./dist/controllers/admin/estadistica.controller.js'],
          'dist/controllers/admin/fraude.controller.js': ['./dist/controllers/admin/fraude.controller.js'],
          'dist/controllers/admin/historico.controller.js':   ['./dist/controllers/admin/historico.controller.js'],
          'dist/controllers/admin/oficina.controller.js':  ['./dist/controllers/admin/oficina.controller.js'],
          'dist/controllers/admin/tipos.controller.js':  ['./dist/controllers/admin/tipos.controller.js'],
          'dist/controllers/admin/usuario.controller.js':   ['./dist/controllers/admin/usuario.controller.js'],
          //
          'dist/controllers/user/fraude.controller.js':['./dist/controllers/user/fraude.controller.js'],
          'dist/controllers/user/usuario.controller.js':    ['./dist/controllers/user/usuario.controller.js'],
          //
          'dist/controllers/main.controller.js': ['./dist/controllers/main.controller.js'],
          // middleware
          'dist/middleware/auth.js': ['./dist/middleware/auth.js'],
          // public-js
          'dist/public/js/addCarga.min.js': ['./dist/public/js/addCarga.min.js'],
          'dist/public/js/addEditEvento.min.js': ['./dist/public/js/addEditEvento.min.js'],
          'dist/public/js/addEditFraude.min.js': ['./dist/public/js/addEditFraude.min.js'],
          'dist/public/js/addEditOficina.min.js': ['./dist/public/js/addEditOficina.min.js'],
          'dist/public/js/addEditRelacion.min.js': ['./dist/public/js/addEditRelacion.min.js'],
          'dist/public/js/addEditSms.min.js': ['./dist/public/js/addEditSms.min.js'],
          'dist/public/js/addEditTipoCierre.min.js': ['./dist/public/js/addEditTipoCierre.min.js'],
          'dist/public/js/addEditTipoEvento.min.js': ['./dist/public/js/addEditTipoEvento.min.js'],
          'dist/public/js/addEditTipoFraude.min.js': ['./dist/public/js/addEditTipoFraude.min.js'],
          'dist/public/js/addEditTipoHito.min.js': ['./dist/public/js/addEditTipoHito.min.js'],
          'dist/public/js/addEditUsuario.min.js': ['./dist/public/js/addEditUsuario.min.js'],
          'dist/public/js/addEjercicio.min.js': ['./dist/public/js/addEjercicio.min.js'],
          'dist/public/js/addHito.min.js': ['./dist/public/js/addHito.min.js'],
          'dist/public/js/asignar.min.js': ['./dist/public/js/asignar.min.js'],
          'dist/public/js/ayuda.min.js': ['./dist/public/js/ayuda.min.js'],
          'dist/public/js/desasignar.min.js': ['./dist/public/js/desasignar.min.js'],
          'dist/public/js/editHistorico.min.js': ['./dist/public/js/editHistorico.min.js'],
          'dist/public/js/editHito.min.js': ['./dist/public/js/editHito.min.js'],
          'dist/public/js/enumeraciones.js': ['./dist/public/js/enumeraciones.js'],
          'dist/public/js/indexAdes.min.js': ['./dist/public/js/indexAdes.min.js'],
          'dist/public/js/indexCargas.min.js': ['./dist/public/js/indexCargas.min.js'],
          'dist/public/js/indexFraudes.min.js': ['./dist/public/js/indexFraudes.min.js'],
          'dist/public/js/indexFraudesAdm.min.js': ['./dist/public/js/indexFraudesAdm.min.js'],
          'dist/public/js/indexHistoricos.min.js': ['./dist/public/js/indexHistoricos.min.js'],
          'dist/public/js/indexOficinas.min.js': ['./dist/public/js/indexOficinas.min.js'],
          'dist/public/js/indexRelaciones.min.js': ['./dist/public/js/indexRelaciones.min.js'],
          'dist/public/js/indexResueltos.min.js': ['./dist/public/js/indexResueltos.min.js'],
          'dist/public/js/indexSmss.min.js': ['./dist/public/js/indexSmss.min.js'],
          'dist/public/js/indexStats.min.js': ['./dist/public/js/indexStats.min.js'],
          'dist/public/js/indexTiposCierre.min.js': ['./dist/public/js/indexTiposCierre.min.js'],
          'dist/public/js/indexTiposEvento.min.js': ['./dist/public/js/indexTiposEvento.min.js'],
          'dist/public/js/indexTiposFraude.min.js': ['./dist/public/js/indexTiposFraude.min.js'],
          'dist/public/js/indexTiposHito.min.js': ['./dist/public/js/indexTiposHito.min.js'],
          'dist/public/js/indexUsuarios.min.js': ['./dist/public/js/indexUsuarios.min.js'],
          'dist/public/js/perfil.min.js': ['./dist/public/js/perfil.min.js'],
          // routes
          'dist/routes/admin.router.js': ['./dist/routes/admin.router.js'],
          'dist/routes/main.router.js': ['./dist/routes/main.router.js'],
          'dist/routes/user.router.js':['./dist/routes/user.router.js'],
          // app
          'dist/app.js': ['./dist/app.js'],
        }
        // src: ['./src/views/admin/usuarios/addEditUsuario.js'],
        // dest: './src/public/js/addEditUsuario.min.js'
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('default-js', ['uglify:js']);
  grunt.registerTask('default-css', ['uglify:css']);
  grunt.registerTask('concat-css', ['concat:css']);
  grunt.registerTask('css-min', ['cssmin']);

};