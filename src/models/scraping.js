const cheerio = require('cheerio');
const request = require('request');

function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request(url, async (error, response, html) => {
            if (!error && response.statusCode == 200) {
                resolve(html);
            } else {
                reject(error);
            }
        });
    });
}

async function main(datosWeb) {
    const dataTours = {};
    for (let j = 0; j < datosWeb.length; j++) {
        let res = await doRequest(datosWeb[j][1]);
        const dataToursResp = [];
        const $ = cheerio.load(res);
        $('.classic2_cols').each(async (i, element) => {
            const img = $(element).find('.tour_image > img').attr('src').trim();
            const title = $(element).find('div.portfolio_info_wrapper a.tour_link > h4').text().trim();
            const description = $(element).find('div.portfolio_info_wrapper div.tour_excerpt > p').text().trim();
            const moreInformation = $(element).find('.tour_image').attr('href').trim();
            await dataToursResp.push({ title: title, description: description, img: img, moreInformation:moreInformation });
        });
        let namePage = datosWeb[j][0];
        dataTours[namePage] = dataToursResp;
    }
    return dataTours;
}

module.exports = {
    main
}
