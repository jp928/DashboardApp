'use strict';

module.exports = function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            template: require('./modules/main/main.html'),
            controller: 'MainController',
            controllerAs: 'MainCtrl',
            resolve: {
                InitChartData: function(ChartDataService) {
                    return ChartDataService.getBarChartData();
                }
            }
        });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    // timeout 5 seconds
    $httpProvider.defaults.timeout = 5000; 
};
