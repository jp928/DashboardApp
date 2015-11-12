/**
 * Entry point of dashboard application
 */
'use strict';

// Styles
require('../bower_components/angular-material/angular-material.scss');
require('../bower_components/c3/c3.min.css');
require('./style/app.scss');

// Controllers
require('./modules');
require('./directives');
require('./services');
require('./constants/constants.app');

module.exports = angular.module('dashboard', ['ui.router', 'ngMaterial', 'appControllers', 'appDirectives', 'appServices', 'appConstants'])
			    	// router config
				    .config(require('./index.router'));
