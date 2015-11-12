/**
 * All services go here
 */

'use strict';

module.exports = angular.module('appServices', [])
    .factory('ChartDataService',  require('./chartData.service'))
    .factory('AppCacheService',  require('./appCache.service'));