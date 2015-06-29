var path = require('path');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    },
    
    bower: {
      install: {
         //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory 
        options: {
          targetDir:'./assets',
          layout: function(type, component, source) {
            if (type[0] === '$') return path.join('styles/lib/' + component, type.substr(1));
            return path.join(type, component);
          },
        },
      }
    },
    
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Build task(s).
  grunt.registerTask('build', [
    'uglify',
  ]);

  
  // Default task(s).
  grunt.registerTask('default', [
    'uglify',
    'bower'
  ]);

};
