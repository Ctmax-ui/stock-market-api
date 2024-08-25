const express = require('express');
const router = express.Router()
const {fetchData} = require('../controller/function')


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



module.exports = router