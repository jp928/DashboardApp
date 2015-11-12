'use strict';

module.exports = function() {
    function link(scope, el, attr) {

        var chart = c3.generate({
            data: {
                columns: [
                    ['data', 10]
                ],
                type: 'gauge'
            },
            gauge: {
                label: {
                    format: function(value, ratio) {
                        return value;
                    }
                },
                max: 10 // 100 is default
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#DD412B', '#282B7C', '#F6C600', '#60B044'], // the three color levels for the values.
                threshold: {
                    values: [5, 6, 7, 8, 9, 10]
                }
            },
            size: {
                height: 180
            },
            bindto: el[0],
        });

        scope.$watch('data', function(data) {
            if (!data) {
                return;
            }
            chart.load({
                columns: [
                    ['data', data]
                ]
            });
        });
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            data: '='
        },
        template: '<div class="chart"></div>',
        replace: true
    };
};
