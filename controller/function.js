const axios = require('axios');




const fetchData = async (url, retries = 10) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'MyApp/1.0',
                'Accept': 'application/json',
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



module.exports = {
    fetchData
}