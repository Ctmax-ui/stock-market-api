const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));


app.use('/v1/api', require('./routes/appRoutes'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
