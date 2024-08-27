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


function calculatePeCe(dataObj) {
    if (!dataObj.length) return 0;

    const interestCe = dataObj.map((item) => item.CE.openInterest || 0);
    const interestPe = dataObj.map((item) => item.PE.openInterest || 0);

    const ceOfSum = interestCe.reduce((partialSum, a) => partialSum + a, 0);
    const peOfSum = interestPe.reduce((partialSum, a) => partialSum + a, 0);

    console.log('CALL-', ceOfSum, 'PUT-', peOfSum, 'SUM=', ceOfSum - peOfSum);
    return ceOfSum - peOfSum;
}




module.exports = {
    calculatePeCe,
    getSurroundingObjects
}