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
        src: ['src/public/css/estilos.css', 'src/public/css/navbar.css', 'src/public/css/tabs.css'],
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
          'src/public/css/styles.css': ['src/public/css/estilos.css', 'src/public/css/navbar.css', 'src/public/css/nav.css', 'src/public/css/tabs.css', 'src/public/css/fonts.css']
        }
      }
    },    
    uglify: {
      // options: {
      //   banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      // },
      js: {
        files: {
          // bin
          'dist/bin/www.js': ['./dist/bin/www.js'],
          // config
          'dist/config/settings.js': ['./dist/config/settings.js'],
          // controllers
          // admin
          'dist/controllers/admin/carga.controller.js':     ['./dist/controllers/admin/carga.controller.js'],
          'dist/controllers/admin/estadistica.controller.js':   ['./dist/controllers/admin/estadistica.controller.js'],
          'dist/controllers/admin/fraude.controller.js': ['./dist/controllers/admin/fraude.controller.js'],
          'dist/controllers/admin/historico.controller.js':   ['./dist/controllers/admin/historico.controller.js'],
          'dist/controllers/admin/oficina.controller.js':  ['./dist/controllers/admin/oficina.controller.js'],
          'dist/controllers/admin/tipos.controller.js':  ['./dist/controllers/admin/tipos.controller.js'],
          'dist/controllers/admin/usuario.controller.js':   ['./dist/controllers/admin/usuario.controller.js'],
          // user
          'dist/controllers/user/fraude.controller.js':['./dist/controllers/user/fraude.controller.js'],
          'dist/controllers/user/usuario.controller.js':    ['./dist/controllers/user/usuario.controller.js'],
          // main
          'dist/controllers/main.controller.js': ['./dist/controllers/main.controller.js'],
          // middleware
          'dist/middleware/auth.js': ['./dist/middleware/auth.js'],
          // public-js
          'dist/public/js/admin/addCarga.min.js': ['./dist/public/js/admin/addCarga.min.js'],
          'dist/public/js/admin/addEditFraude.min.js': ['./dist/public/js/admin/addEditFraude.min.js'],
          'dist/public/js/admin/addEditOficina.min.js': ['./dist/public/js/admin/addEditOficina.min.js'],
          'dist/public/js/admin/addEditTipoCierre.min.js': ['./dist/public/js/admin/addEditTipoCierre.min.js'],
          'dist/public/js/admin/addEditTipoEvento.min.js': ['./dist/public/js/admin/addEditTipoEvento.min.js'],
          'dist/public/js/admin/addEditTipoFraude.min.js': ['./dist/public/js/admin/addEditTipoFraude.min.js'],
          'dist/public/js/admin/addEditTipoHito.min.js': ['./dist/public/js/admin/addEditTipoHito.min.js'],
          'dist/public/js/admin/addEditUsuario.min.js': ['./dist/public/js/admin/addEditUsuario.min.js'],
          'dist/public/js/admin/asignar.min.js': ['./dist/public/js/admin/asignar.min.js'],
          'dist/public/js/admin/desasignar.min.js': ['./dist/public/js/admin/desasignar.min.js'],
          'dist/public/js/admin/editHistorico.min.js': ['./dist/public/js/admin/editHistorico.min.js'],
          'dist/public/js/admin/indexAdes.min.js': ['./dist/public/js/admin/indexAdes.min.js'],
          'dist/public/js/admin/indexCargas.min.js': ['./dist/public/js/admin/indexCargas.min.js'],
          'dist/public/js/admin/indexFraudes.min.js': ['./dist/public/js/admin/indexFraudes.min.js'],
          'dist/public/js/admin/indexHistoricos.min.js': ['./dist/public/js/admin/indexHistoricos.min.js'],
          'dist/public/js/admin/indexOficinas.min.js': ['./dist/public/js/admin/indexOficinas.min.js'],
          'dist/public/js/admin/indexResueltos.min.js': ['./dist/public/js/admin/indexResueltos.min.js'],
          'dist/public/js/admin/indexStats.min.js': ['./dist/public/js/admin/indexStats.min.js'],
          'dist/public/js/admin/indexTiposCierre.min.js': ['./dist/public/js/admin/indexTiposCierre.min.js'],
          'dist/public/js/admin/indexTiposEvento.min.js': ['./dist/public/js/admin/indexTiposEvento.min.js'],
          'dist/public/js/admin/indexTiposFraude.min.js': ['./dist/public/js/admin/indexTiposFraude.min.js'],
          'dist/public/js/admin/indexTiposHito.min.js': ['./dist/public/js/admin/indexTiposHito.min.js'],
          'dist/public/js/admin/indexUsuarios.min.js': ['./dist/public/js/admin/indexUsuarios.min.js'],
          // user-js
          'dist/public/js/user/addEditEvento.min.js': ['./dist/public/js/user/addEditEvento.min.js'],
          'dist/public/js/user/addEditFraude.min.js': ['./dist/public/js/user/addEditFraude.min.js'],
          'dist/public/js/user/addEditSms.min.js': ['./dist/public/js/user/addEditSms.min.js'],
          'dist/public/js/user/addEjercicio.min.js': ['./dist/public/js/user/addEjercicio.min.js'],
          'dist/public/js/user/addHito.min.js': ['./dist/public/js/user/addHito.min.js'],
          'dist/public/js/user/editHito.min.js': ['./dist/public/js/user/editHito.min.js'],
          'dist/public/js/user/indexFraudes.min.js': ['./dist/public/js/user/indexFraudes.min.js'],
          'dist/public/js/user/indexRelaciones.min.js': ['./dist/public/js/user/indexRelaciones.min.js'],
          'dist/public/js/user/indexResueltos.min.js': ['./dist/public/js/user/indexResueltos.min.js'],
          'dist/public/js/user/indexSmss.min.js': ['./dist/public/js/user/indexSmss.min.js'],
          'dist/public/js/user/perfil.min.js': ['./dist/public/js/user/perfil.min.js'],
          // 
          'dist/public/js/ayuda.min.js': ['./dist/public/js/ayuda.min.js'],
          'dist/public/js/enumeraciones.js': ['./dist/public/js/enumeraciones.js'],
          // routes
          'dist/routes/admin.router.js': ['./dist/routes/admin.router.js'],
          'dist/routes/main.router.js': ['./dist/routes/main.router.js'],
          'dist/routes/user.router.js':['./dist/routes/user.router.js'],
          // app
          'dist/app.js': ['./dist/app.js'],
        }
        // src: ['./src/views/admin/fraudes/ades/desasignar.js'],
        // dest: './src/public/js/admin/desasignar.min.js'
      },
      css: {
        src:  'src/public/css/concat.css',
        dest: 'src/public/css/concat.min.css'
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  
  // para minimizar js es OK
  grunt.registerTask('default-js', ['uglify:js']);
  // minimizar css y concat es OK
  grunt.registerTask('css-min', ['cssmin']);
  
  // para unir es OK (pero usar cssmin)
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('concat-css', ['concat:css']);  
  // para minificar da error no utilizar
  grunt.registerTask('default-css', ['uglify:css']);
};