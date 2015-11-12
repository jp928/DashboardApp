/**
 * All directices go here
 */

'use strict';

module.exports = angular.module('appDirectives', [])
    .directive('barChart', require('./barChart.directive'))
    .directive('gaugeChart', require('./gaugeChart.directive'));
