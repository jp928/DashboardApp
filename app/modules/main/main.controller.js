'use strict';

module.exports = function(ChartDataService, InitChartData) {
    var MainCtrl = this;

    //initial the latest update date time
    MainCtrl.updateDate = new Date();
    MainCtrl.gaugeChartData1 = 6;
    MainCtrl.gaugeChartData2 = 7.2;

    // get bar chart data from service
    MainCtrl.barChartData = InitChartData;

    MainCtrl.toggleSideNav = function() {
        alert('testing');
    };

    MainCtrl.updateCharts = function() {
        // set current as latest update date time
        MainCtrl.updateDate = new Date();

        var randomChartData = ChartDataService.getRandomGaugueChartData(2);
        MainCtrl.gaugeChartData1 = randomChartData[0];
        MainCtrl.gaugeChartData2 = randomChartData[1];

        MainCtrl.barChartData = ChartDataService.getRandomBarChartData(4);
    };
};
