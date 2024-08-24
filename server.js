const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');

const fetchData = async (url, retries = 3) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'MyApp/1.0',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying request... Attempts left: ${retries}`);
            return fetchData(url, retries - 1);
        } else {
            throw error;
        }
    }
};

app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));

// app.get('/',(req,res)=>{
//     res.send({
//         "name": "hello",
//         "name": "hi",
//     })
// })

app.get('/', async (req, res) => {
    try {
        const data = await fetchData('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY');
        res.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
