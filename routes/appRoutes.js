const express = require('express');
const router = express.Router()
const { fetchData } = require('../controller/function')
const { getSurroundingObjects, calculatePeCe } = require('../controller/totalSum')


router.route('/open/:sotckName').get(async (req, res) => {
    // console.log(req.params.sotckName);
    try {
        const data = await fetchData('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY');
        res.json(data);
    } catch (error) {
        // console.error('Fetch error:', error);
        res.status(404).send('stock not found');
    }
});

router.route('/stocks/:sotckName').get(async (req, res) => {
    // console.log(req.params.sotckName);

    let dynamicParam = 'NIFTY-50'

    try {
        const data = await fetchData(`https://www.nseindia.com/api/chart-databyindex-dynamic?index=${dynamicParam.replace(/-/g, '%20')}&indices=true`);
        res.json(data);
    } catch (error) {
        // console.error('Fetch error:', error);
        res.status(404).send('stock not found');
    }
});


router.route('/eqstocks').get(async (req, res) => {
    // console.log(req.params.sotckName);

    try {
        const data = await fetchData(`https://www.nseindia.com/api/equity-stock?index=allcontracts`);
        res.json(data);
    } catch (error) {
        // console.error('Fetch error:', error);
        res.status(404).send('stock not found');
    }
});


router.route('/calculate/sum').get(async (req, res) => {
    const d = new Date();
    const timeString = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    try {
        const data = await fetchData(`https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY`);
        const stockPrice = await fetchData(`https://www.nseindia.com/api/marketStatus`);
        if (data && stockPrice) {
            console.log('data is ',stockPrice.marketState[0].last);
            let latestStockPrice = Math.round(stockPrice.marketState[0].last)
            
            let srObject = getSurroundingObjects(data.filtered.data, latestStockPrice, 2)
            
            let totalOpenInt = calculatePeCe(srObject)

            console.log(srObject);
            
            console.log(` total value: ${totalOpenInt}, stock price: ${latestStockPrice},time: ${timeString}`)

            res.json({'totalSum':totalOpenInt, 'timeStamp':timeString});

        }else{
            res.send('data none and stockprice none')
        }

    } catch (error) {


        res.status(404).send('server side issue');
    }
});



module.exports = router