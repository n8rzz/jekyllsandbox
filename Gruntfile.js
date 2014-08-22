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
		shell: {
			jekyllBuild: {
				command: 'jekyll build'
			},
			jekyllServer: {
				command: 'jekyll server'
			},
			jekyllDeploy: {
				command: 'cp -a _site/. _deploy/'
			}
		},
		clean: {
			css: {
				src: [ 'css/*.css', '!css/style.min.css' ]
			},
			deploy: {
				src: [ '_deploy' ]
			}
		},
		sass: {
			jekyll: {
				files: {
					'css/style.css' : 'sass/style.scss'
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'css/',
				src: ['*.css', '!*.min.css'],
				dest: 'css/',
				ext: '.min.css'
			}
		},
		watch: {
			css: {
				files: ['sass/**/*scss'],
				tasks: [
					'sass:jekyll',
					'cssmin',
					'clean:css',
					'shell:jekyllBuild',
				],
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
		sync: {
			deploy: {
				files: [{
					cwd: '_site',
					src: [ '**' ],
					dest: '_deploy',
				}],
				verbose: true
			}
		},
		changelog: {}
	});

	grunt.registerTask('default', [ 'watch' ]);

	grunt.registerTask('server', [
		'express',
		'open',
		'watch'
	]);

	grunt.registerTask('build', [
		'sass:jekyll',
		'cssmin',
		'clean:css',
		'shell:jekyllBuild'
	]);

	grunt.registerTask('deploy', [
		'sync:deploy',
		//'clean:deploy',
		//'shell:jekyllDeploy',
	]);

	grunt.registerTask('version', 'changelog');

}