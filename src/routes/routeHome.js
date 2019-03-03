const router = require('express').Router();
const LocalStorage =  require('node-localstorage').LocalStorage;
const getJson = require('../models/getJson');
localStorage = new LocalStorage('./scratch');

router.get('/', async(request, response) => {
    const url = "https://scripingwebparamotrek.herokuapp.com/scraping/paramotrek";
    const dataJson = await getJson.getData(url);
    localStorage.setItem('scripingParamotrek',JSON.stringify(dataJson));
    response.render('index',{dataJson});
});

router.get('/scraping/findTitle/',(request, response) => {
    let paramTitle = request.query.title.toLowerCase();
    let localData = JSON.parse(localStorage.getItem('scripingParamotrek'));
    newDataToursResp = {};
    Object.keys(localData).forEach(nameTag => {
        let findInData = localData[nameTag].filter(titleData =>{
            return titleData.title.toLowerCase().indexOf(paramTitle) !== -1
        });
        newDataToursResp[nameTag] = findInData;
    });
    response.json(newDataToursResp);
    response.end();
});

module.exports = router;