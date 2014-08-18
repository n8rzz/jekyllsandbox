---
layout: post
title: "Grunt with Jekyll"
date: "2014-08-17 02:07:00"
categories:
- grunt

---

Below you will find my 'current' `Gruntfile.js`.  It's still very much a work in progess, but I finally have it running smoothly and in a way that suits me.


###Tasks

- `grunt` & `grunt watch`
set to the default grunt task, so either command does the same thing: compiles SASS, minifies resulting CSS file, deletes the non-minified CSS file and finally runs the `jekyll build` command with `grunt-shell`.

- `grunt server`
Starts an express server allowing for livereload.  It also executes the `grunt watch` command.  So it does everything above plus running the server.

- `grunt build`
Same as `grunt watch` for now.  Will be extending this one in the future.



{% highlight javascript %}
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
		}
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
		'shell:jekyllBuild',
	]);
{% endhighlight %}

I'm a relatively recent grunt convert.  But, I can tell you, it is relatively easy to pick up and has the ability to do some amazing things!  The livereload capability alone is enough to at least take a look at it!

####References
- [grunt.js][grunt]
- [node.js][node] & [node package manager (npm)][npm]
- [jekyll][jekyll]

[grunt]: http://gruntjs.com/getting-started
[node]: http://nodejs.org/  
[npm]: https://www.npmjs.org/
[jekyll]: http://jekyllrb.com/