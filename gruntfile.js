module.exports = function(grunt) {

// IMPORTANT
// Change the following line  to point to the correct location for the pem file on your local machine
var pemKey = '/home/gary/.ssh/hes/hes.pem';


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["build/"],
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: false,
            src: ['src/jquery-1.8.3.min.js'],
            dest: 'build/chrome/jquery-1.8.3.min.js',
            filter: 'isFile'
          },
          {
            expand: true,
            src: ['*.png'],
            dest: 'build/chrome/',
            filter: 'isFile'
          },
          {
            expand: true,
            src: ['*.pxm'],
            dest: 'build/chrome/',
            filter: 'isFile'
          },
          {
            expand: false,
            src: ['build/hubski_enhancement_suite.user.min.js'],
            dest: 'build/chrome/hubski_enhancement_suite.user.min.js',
            filter: 'isFile'
          },
          {
            expand: false,
            src:['chrome/manifest.json'],
            dest:'build/chrome/manifest.json',
            filter: 'isFile'
          }
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/hubski_enhancement_suite.user.js',
        dest: 'build/hubski_enhancement_suite.user.min.js'
      }
    },

    crx: {
      myExtension: {
        'src': 'build/chrome/',
        'dest': 'build/crx/',
        'privateKey': pemKey,
        'filename': 'hubski_enhancement_suite.crx'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'copy', 'crx']);

};