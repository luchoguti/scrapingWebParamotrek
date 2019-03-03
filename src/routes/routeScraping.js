const router = require('express').Router();
const services = require('../models/scraping');

function isObject(v) {
    return '[object Object]' === Object.prototype.toString.call(v);
};

JSON.sort = function (o) {
    if (Array.isArray(o)) {
        return o.sort().map(JSON.sort);
    } else if (isObject(o)) {
        return Object
            .keys(o)
            .sort()
            .reduce(function (a, k) {
                a[k] = JSON.sort(o[k]);
                return a;
            }, {});
    }
    return o;
}

router.get('/scraping/paramotrek', (request, response) => {
    const tourParamotrek = [
        ['trekking', 'https://paramotrek.com/tourcat/trekking/'],
        ['climbing', 'https://paramotrek.com/tourcat/climbing/'],
        ['hiking', 'https://paramotrek.com/tourcat/hiking/'],
        ['expeditions', 'https://paramotrek.com/tourcat/expeditions/']
    ];
    services.main(tourParamotrek).then(async data => {
        const sort = JSON.sort(data);
        await response.json(sort);
        response.end();
    });
});
module.exports = router;