const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to fetch data from a URL with retry logic
async function fetchData(url, retries = 3) {
    const headers = {
        'User-Agent': 'MyApp/1.0',
        'Accept': 'application/json',
    };

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            if (attempt < retries - 1) {
                console.log(`Retrying request... Attempts left: ${retries - attempt - 1}`);
            } else {
                throw error;
            }
        }
    }
}

// URLs for fetching data
const openInterestUrl = 'https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY';
const stockPriceUrl = 'https://www.nseindia.com/api/marketStatus';

// Function to get surrounding objects based on strike price and range
function getSurroundingObjects(data, strikePrice, range =2) {
    console.log(`strike price: ${strikePrice}, range: ${range}`);
    
    // Check if the strike price contains a "0"
    const isRoundPrice = strikePrice.toString().endsWith('0');
    console.log(`Is strike price round?: ${isRoundPrice}`);

    let index;
    if (isRoundPrice) {
        // Find the exact index for the round strike price
        index = data.findIndex((item) => item.strikePrice === strikePrice);
        console.log(`Index found for round strike price: ${index}`);
        
        if (index === -1) {
            console.log('Round strike price not found in data');
            return [];
        }

        // Calculate start and end indices
        const startIndex = Math.max(0, index - range);
        const endIndex = Math.min(data.length - 1, index + range);
        console.log('Round strike price: ', {
            startIndex,
            endIndex,
            dataSlice: data.slice(startIndex, endIndex + 1)
        });

        return data.slice(startIndex, endIndex + 1);
    } else {
        // Find the index for the first strike price greater than or equal to the given strike price
        index = data.findIndex((item) => item.strikePrice >= strikePrice);
        console.log(`Index found for non-round strike price: ${index}`);

        if (index === -1) {
            console.log('Non-round strike price not found in data');
            return [];
        }

        // Calculate start and end indices
        const startIndex = Math.max(0, index - range);
        const endIndex = Math.min(data.length - 1, index + range);
        console.log('Non-round strike price: ', {
            startIndex,
            endIndex,
            dataSlice: data.slice(startIndex, endIndex)
        });

        return data.slice(startIndex, endIndex);
    }
}

// Function to calculate PE/CE values
function calculatePECE(dataObj) {
    if (!dataObj.length) {
        return 0;
    }

    const interestCE = dataObj.map(item => (item.CE ? item.CE.openInterest || 0 : 0));
    const interestPE = dataObj.map(item => (item.PE ? item.PE.openInterest || 0 : 0));

    const ceSum = interestCE.reduce((sum, val) => sum + val, 0);
    const peSum = interestPE.reduce((sum, val) => sum + val, 0);

    console.log('CALL-', ceSum, 'PUT-', peSum, 'SUM=', ceSum - peSum);
    return ceSum - peSum;
}

// Function to run the process at intervals
const jsonFilePath = path.join(__dirname, 'data', 'example.json');

// const date = new Date();


function runAtIntervals() {

    async function runDataFetcher(date) {
        let dayMoYr = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
        let filename = `./data/${dayMoYr}.json`
        try {
            const openInterestData = await fetchData(openInterestUrl);
            const stockPriceData = await fetchData(stockPriceUrl);

            const strikePrice = Math.round(stockPriceData.marketState[0].last);
            const surroundingData = getSurroundingObjects(openInterestData.filtered.data, strikePrice);

            const totalSum = calculatePECE(surroundingData);

            const currentTime = date.toLocaleTimeString()

            const outputData = {
                totalSum,
                timeStamp: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            };

            let existingData = [];

            if (fs.existsSync(filename)) {
                try {
                    existingData = JSON.parse(fs.readFileSync(filename, 'utf8'));
                } catch (error) {
                    console.log('Error reading JSON file:', error);
                }
            }

            existingData.push(outputData);

            fs.writeFileSync(filename, JSON.stringify(existingData, null, 4), 'utf8');
            console.log(`Data saved at ${currentTime}:`, outputData);
            console.log('________________________________________________New LIne end');
        } catch (error) {
            console.error('Error during data fetch or processing:', error);
        }
    }

    setInterval(() => {
        const date = new Date();

        const startHours = 9
        const startMinute = 20
        const endHours = 15
        const endMinute = 20

        const isWithinTimeRange =
            (date.getHours() > startHours || (date.getHours() === startHours && date.getMinutes() >= startMinute)) &&
            (date.getHours() < endHours || (date.getHours() === endHours && date.getMinutes() <= endMinute));

        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

        if (isWithinTimeRange && date.getMinutes() % 5 == 0 && date.getSeconds() == 5) {
            console.log(`Interval runned at ${date.toLocaleTimeString()}`);
            runDataFetcher(date)
        }

    }, 1000);

}

// Start the process with an interval of 5 minutes
// runAtIntervals();

module.exports = runAtIntervals
