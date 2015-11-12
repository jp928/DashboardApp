//create cache for application wide
'use strict';

module.exports = function($cacheFactory) {
    return $cacheFactory('appCache');
};
