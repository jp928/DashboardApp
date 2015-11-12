'use strict';

module.exports = function() {
    function link(scope, el, attr) {

        var normalizeData = function(inputData) {
            return _.map(inputData, function(obj) {
                return {
                    'name': obj.name + '(' + obj.ads + ' ads)',
                    'value': obj.value
                }
            });
        };

        var maxWidth = Math.max(document.getElementsByClassName('data-demo-container')[0].clientWidth, 360) * 0.7,
            data = normalizeData(scope.data);

        var chart = c3.generate({
            data: {
                json: data,
                type: 'bar',
                keys: {
                    x: 'name',
                    value: ['value']
                }
            },
            bar: {
                width: 30
            },
            axis: {
                y: {
                    tick: {
                        format: d3.format('%')
                    },
                    max: 0.9
                },
                x: {
                    padding: {
                        left: 1,
                        right: 1,
                    },
                    fit: true,
                    type: 'category'
                },
                rotated: true
            },
            size: {
                height: 400,
                width: maxWidth
            },
            bindto: el[0]
        });

        scope.$watch('data', function(data) {

            if (!data) {
                return;
            } else {
                data = normalizeData(data);
            }

            chart.load({
                json: data,
                keys: {
                    x: 'name',
                    value: ['value']
                }
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
