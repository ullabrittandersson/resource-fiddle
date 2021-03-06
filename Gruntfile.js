var fs = require("fs");

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},

			'bin/js/resource-fiddle.bundle.js': ['src/client/js/fiddleclient.js'],
			'test/target.bundle.js': ['test/target.js']

		},
		php: {
			dist: {
				options: {
					port: 8080,
					base: 'www',
					open: false,
					keepalive: true
				}
			}
		},
		copy: {
			client: {
				files: [{
					expand: true,
					cwd: 'src/client/php/',
					src: ['**'],
					dest: 'www/php'
				}, {
					expand: true,
					cwd: 'src/client/php/',
					src: ['.htaccess'],
					dest: 'www/php'
				}, {
					expand: true,
					cwd: 'src/client/test/',
					src: ['*'],
					dest: 'www',
					filter: 'isFile'
				}, {
					expand: true,
					cwd: 'src/client/test/',
					src: ['.htaccess'],
					dest: 'www'
				}, {
					expand: true,
					cwd: 'res/',
					src: ['*'],
					dest: 'www/img',
					filter: 'isFile'
				}]
			},
			target: {
				files: [{
					expand: true,
					cwd: 'src/target/php/',
					src: ['**'],
					dest: 'www/php'
				}, {
					expand: true,
					cwd: 'src/target/',
					src: ['*'],
					dest: 'www',
					filter: 'isFile'
				}]
			},
			release: {
				files: [{
					expand: true,
					cwd: 'src/client/php/',
					src: ['**'],
					dest: 'bin/php'
				}, {
					expand: true,
					cwd: 'src/client/test/',
					src: ['.htaccess'],
					dest: 'bin'
				}, {
					expand: true,
					cwd: 'src/client/release/',
					src: ['*'],
					dest: 'bin',
					filter: 'isFile'
				}, {
					expand: true,
					cwd: 'res/',
					src: ['*'],
					dest: 'bin/img',
					filter: 'isFile'
				}, {
					expand: true,
					cwd: 'node_modules/semantic-ui/dist',
					src: '**',
					dest: 'bin/semantic-ui',
				}, {
					src: 'node_modules/jquery/dist/jquery.min.js',
					dest: 'bin/js/jquery.min.js'
				}]
			}
		}
	});

	grunt.registerTask("fixDebugPermissions", function() {
		fs.chmodSync("www", 0777);
	});

	grunt.loadNpmTasks('grunt-php');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	/*grunt.registerTask('debug', ['copy:target', 'copy:client', 'browserify', 'concat_css:build', 'cssmin:client', 'fixDebugPermissions']);*/
	grunt.registerTask('build', ['copy:release', 'browserify']);
	grunt.registerTask('server', ['php']);

	grunt.registerTask("default", function() {
		console.log("Available tasks:");
		console.log();
		console.log("  build     - Build files for release and/or local testing.");
	});
};