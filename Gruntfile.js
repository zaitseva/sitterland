module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// cleanup build directory 
		clean: {
			dist: ['build']
		},



		concat: {
			css: {
				src: ['src/css/_bootstrap.scss','src/css/prebuild/*.scss','src/css/common_ui/*.scss' ],
				dest: 'src/css/style.scss',
			},
			js: {
				src: ['src/js/script.js'],
				dest: 'build/js/script.js',
			},
			jslib: {
				src: ['src/js/libs/priority_01/**/*.js', 'src/js/libs/priority_02/**/*.js', 'src/js/libs/priority_03/**/*.js'],
				dest: 'build/js/libs.js',
			}
		},

		// compile scss -> css and place css to build directory
		sass: {
			dist: {
				files: {
					'build/css/style.css': 'src/css/style.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'Android >= <%= pkg.browsers.android %>',
					'Chrome >= <%= pkg.browsers.chrome %>',
					'Firefox >= <%= pkg.browsers.firefox %>',
					'Explorer >= <%= pkg.browsers.ie %>',
					'iOS >= <%= pkg.browsers.ios %>',
					'Opera >= <%= pkg.browsers.opera %>',
					'Safari >= <%= pkg.browsers.safari %>'
				]
			},
			dist: {
				src: ['build/css/**/*.css']
			}
		},

		csscomb: {
			dist: {
				options: {
					config: '.csscomb.json'
				},
				files: [{
					expand: true,
					cwd: 'build/css',
					src: '**/*.css',
					dest: 'build/css'
				}]
			}
		},
			
		cssmin: {
			options: {
				keepBreaks: true,
				keepSpecialComments: 0
			},
			dist: {
				files: [
				{
					expand: true,
					cwd: 'build/css',
					src: ['*.css'],
					dest: 'build/css',
					ext: '.css'
				}
				]
			}
		},
		prettify: {
			options: {
				brace_style: 'expand',
				indent: 1,
				indent_char: '	',
				condense: true,
				indent_inner_html: true
			},
			all: {
				expand: true,
				cwd: 'build',
				ext: '.html',
				src: '**/*.html',
				dest: 'build'
			},
		},



		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				force: true,
				globals: {
					jQuery: true
				}
			},
			all: [
				'build/js/**/*.js',
				'!build/js/libs.js',
			],
			configFiles: [
				'.csscomb.json',
				'Gruntfile.js',
				'package.json'
			]
		},

		uglify: {
				dist: {
					files: {
						'build/js/script.js':['build/js/script.js'],
						'build/js/libs.js':['build/js/libs.js']
					}
				}
				//app:{
				//	files: [
				//	{
				//		expand: true,
				//		cwd: 'build/app',
				//		src: ['**/*.js', '!**/*.min.js', '!**/mosapp.js'],
				//		dest: 'build/app',
				//		ext: '.js'
				//	}
				//	]
				//}
			},

		copy: {
			// scripts: {
			// 	files: [{
			// 		expand: true,
			// 		cwd: 'src/js',
			// 		src: ['**/*.js', '!libs/**/*.js'],
			// 		dest: 'build/js',
			// 		filter: 'isFile'
			// 	}]
			// },
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.{php,html,json}'],
					dest: 'build/',
					filter: 'isFile'
				}]
			},
			font: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.{eot,ttf,woff,svg,css}'],
					dest: 'build',
					filter: 'isFile'
				}]
			}
		},


		imagemin: {
			images: {
				files: [{
					expand: true,
					cwd: 'src/images',
					src: ['**/*.{png,jpg,gif}', '!sprite/**/*'],
					dest: 'build/images'
				}]
			},
			icons: {
				files: [{
					expand: true,
					cwd: 'src/icons',
					src: ['**/*.{png,jpg,gif}', '!sprite/**/*'],
					dest: 'build/icons'
				}]
			}
		},


		connect: {
			options: {
			},
			server: {}
		},

		livereload: {
			options: {
				livereload: true
			},
			files: ['build/**/*']
		},


		watch: {
			options: {
				dateFormat: function (ms) {
					var now = new Date(),
						time = now.toLocaleTimeString(),
						day = now.getDate(),
						month = now.getMonth() + 1,
						year = now.getFullYear();

					if (day < 10) {
						day = '0' + day;
					}

					if (month < 10) {
						month = '0' + month;
					}

					grunt.log.subhead(
						'Completed in ' + Math.round(ms) + 'ms at ' + time + ' ' +
						day + '.' + month + '.' + year + '.\n' +
						'Waiting for more changes...'
					);
				},
				livereload: true,
			},
			configFiles: {
				options: {
					reload: true
				},
				files: ['.csscomb.json', 'Gruntfile.js', 'package.json'],
				tasks: ['newer:jshint:configFiles']
			},
			imagemin: {
				files: ['src/images/**/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin:images']
			},
			iconmin: {
				files: ['src/icons/**/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin:icons']
			},
			copyMain: {
				files: ['source/**/.{php,html,json}'],
				tasks: ['newer:copy:main']
			},
			fontcopy: {
				files: ['src/**/*.{eot,ttf,woff,svg,css}'],
				tasks: ['newer:copy:font']
			},
			// svgimgcopy: {
			// 	files: ['src/images/**/*.svg', '!src/images/sprite/**/*'],
			// 	tasks: ['copy:svgimage']
			// },
			sass: {
				files: ['src/**/*.scss'],
				tasks: ['concat:css', 'sass', 'autoprefixer','csscomb','cssmin']	
			},
			scripts: {
				files: ['src/js/**/*.js', '!src/js/libs/**/*'],
				tasks: ['concat:js']
			},
			jshint: {
				files: ['build/js/**/*.js', '!build/js/libs.js'],
				tasks: ['newer:jshint:all']
			},
			libscripts: {
				files: ['src/js/libs/**/*'],
				tasks: ['concat:jslib']
			}
		}
	});


	require('load-grunt-tasks')(grunt);

	grunt.registerTask('build', [
		'clean',
		'concat',
		'sass',
		'autoprefixer',
		'csscomb',
		'cssmin',
		'prettify',
		'imagemin',
		'jshint',
		'uglify',
		'copy'
	]);

	grunt.registerTask('default', [
		'build',
		'watch'

	]);

};




