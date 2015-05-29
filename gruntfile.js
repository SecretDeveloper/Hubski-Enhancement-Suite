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
          // CHROME
          {
            expand: false,
            src: ['src/jquery-1.8.3.min.js','build/hubski_enhancement_suite.user.min.js'],
            dest: 'build/chrome/',
            filter: 'isFile',
            flatten: true
          },
          {
            expand: true,
            src: ['*.png','*.pxm'],
            dest: 'build/chrome/',
            filter: 'isFile'
          },
          {
            expand: false,
            src:['chrome/manifest.json'],
            dest:'build/chrome/manifest.json',
            filter: 'isFile'
          },

          // SAFARI
          {
            expand:false,
            src: ['src/jquery-1.8.3.min.js','build/hubski_enhancement_suite.user.min.js'],
            dest:'build/hes.safariextension',
            filter:'isFolder'
          },

          // FIREFOX
          {
            expand:false,
            src: ['src/jquery-1.8.3.min.js','build/hubski_enhancement_suite.user.min.js'],
            dest:'build/firefox',
            filter:'isFolder'
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