'use strict';

function chartDataService(RequestUrl, AppCacheService, $http, $q) {

    var self = this;

    // private properties
    self.barChartData = [];
    self.shuffleArray = function(inputArr) {
        for (var i = inputArr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = inputArr[i];
            inputArr[i] = inputArr[j];
            inputArr[j] = temp;
        }
        return inputArr;
    };

    return {
        getBarChartData: function() {

            var deferred = $q.defer(),
                link = RequestUrl + 'barChart.json',
                cachedBarChartData = AppCacheService.get('barChartData');

            if (_.isUndefined(cachedBarChartData)) {

                $http.get(link)
                    .then(function(res) {
                        if (res && res.status === 200) {
                            AppCacheService.put('barChartData', res.data);
                            self.barChartData = res.data;
                            deferred.resolve(res.data);
                        } else {
                            //otherwise resolve empty array
                            deferred.resolve([]);
                        }
                    }, function(err) { // <--- error handler
                        deferred.reject(err);
                    });

            } else { // if cache is found
                deferred.resolve(cachedBarChartData);
            }

            return deferred.promise;
        },

        getRandomGaugueChartData: function(num) {
            var _result = [];

            //if the input is a finite number
            if (_.isFinite(num)) {
                for (var i = 0; i < num; i++) {
                    _result.push(parseFloat(_.random(10, true).toFixed(1)));
                }
            }

            return _result;
        },

        getRandomBarChartData: function(num) {
            var _result = [],
                dehydrateData = self.barChartData.map(function(obj) {
                    return {
                        'name': obj.name,
                        'info': obj.info
                    };
                });

            dehydrateData = self.shuffleArray(dehydrateData);

            //if the input is a finite number
            if (_.isFinite(num) && num <= dehydrateData.length) {

                for (var i = 0; i < num; i++) {
                    _result.push({
                        'name': dehydrateData[i].name,
                        'value': parseFloat(_.random(1, true).toFixed(2)),
                        'info': dehydrateData[i].info,
                        'ads': parseInt(_.random(1000))
                    });
                }
            }

            return _result;
        }
    };
}

module.exports = ['RequestUrl', 'AppCacheService', '$http', '$q', chartDataService];
