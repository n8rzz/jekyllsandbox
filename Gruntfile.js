'use strict';

module.exports = function(grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		express: {
			all: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: ['_site'],
					livereload: true,
				}
			}
		},
		clean: {
			jekyll: {
				src: [ '_site/**' ]
			}
		},
		shell: {
			jekyllBuild: {
				command: 'jekyll build'
			},
			jekyllServer: {
				command: 'jekyll server'
			}
		},
		sass: {
			jekyll: {
				files: {
					'css/style.css' : 'sass/style.scss'
				}
			}
		},
//		copy: {
//			sass: {
//				files: [{
//					cwd: 'css/style.css',
//					dest: '_site/css/'
//				}]
//			}
//		},
		watch: {
			css: {
				files: ['sass/**/*scss'],
				tasks: ['sass:jekyll', 'shell:jekyllBuild'],
				options: {
					livereload: true
				}
			},
			jekyllSources: {
		        files: [
					'*.html',
					'*.yml',
					'assets/js/**.js',
					'_posts/**',
					'_includes/**'
		          ],
		        tasks: [
		        	'shell:jekyllBuild',
		        ],
		        options: {
		        	livereload: true
		        }
		      },
		},
		open: {
			all: {
				path: 'http://localhost:<%= express.all.options.port%>/index.html'
			}
		},
	});

	grunt.registerTask('default', [ 'watch' ]);

	grunt.registerTask('server', [
		'express',
		'open',
		'watch'
	]);

	grunt.registerTask('build', [
		'shell:jekyllBuild',
	]);

}