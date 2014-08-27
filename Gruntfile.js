'use strict';

module.exports = function(grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		express: {
			site: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: ['_site'],
					livereload: true,
				}
			},
			docs: {
				options: {
					port: 9001,
					hostname: "0.0.0.0",
					bases: ['docs'],
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
					'*.md',
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
		      config: {
		      	files: ['*.json', '*.js'],
		      	options: {
		      		livereload: true
		      	}
		      }
		},
		open: {
			site: {
				path: 'http://localhost:<%= express.site.options.port%>/index.html'
			},
			docs: {
				path: 'http://localhost:<%= express.docs.options.port%>/index.html'
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
		release: {
			options: {
				npm: false,
				npmtag: false,
				tagName: 'v<%= version %>',
				commitMessage: 'release v<%= version %>',
				tagMessage: 'Version <%= version %>',
			}
		},
		changelog: {
			options: {
				repository: '<%= pkg.repository.url %>'
			}
		},
		hologram: {
			generate: {
				options: {
					config: 'hologram_config.yml'
				}
			}
		}
	});

	grunt.registerTask('default', [ 'watch' ]);

	grunt.registerTask('server', [
		'express:site',
		'open:site',
		'watch'
	]);

	grunt.registerTask('build', [
		'sass:jekyll',
		'cssmin',
		'clean:css',
		'shell:jekyllBuild'
	]);

	grunt.registerTask('deploy', [
		'shell:jekyllBuild',
		'sync:deploy',
		//'clean:deploy',
		//'shell:jekyllDeploy',
	]);

	grunt.registerTask('newrelease', [
		'release',
		'changelog'
	]);

	grunt.registerTask('docs', [
		'hologram',
		'express:docs',
		'open:docs'
	]);

}