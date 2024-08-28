# Stock Market Data API

This Node.js API provides various endpoints to fetch stock market data, including open interest data, current stock prices, and equity details. The API is designed to help users retrieve financial data such as the sum of current open interest, detailed open chain data, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Get Sum Value of Current Open Interest](#get-sum-value-of-current-open-interest)
  - [Get Open Interest Data by Stock Name](#get-open-interest-data-by-stock-name)
  - [Get Current Price by Stock Name](#get-current-price-by-stock-name)
  - [Get All Equity Data](#get-all-equity-data)
  - [Calculate Sum of Open Interest](#calculate-sum-of-open-interest)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stock-market-api.git
   ```

2. Navigate to the project directory:

    ```bash
    cd stock-market-api
    ```

3. Install the required dependencies:
    
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    node ./app.js
    ```

The server will start on `http://localhost:3000`.

## Usage
### This API provides several endpoints to access stock market data. Below are the details of each endpoint and how to use them.

## Endpoints

1. ### Get Sum Value of Current Open Interest

### URL: `http://localhost:3000/v1/api/data`
### Method: GET
### Description: Retrieves the sum value of the current open interest on Nifty.

   ```bash
    curl -X GET http://localhost:3000/v1/api/data
   ```

2. ### Get Open Interest Data by Stock Name.

### URL: `http://localhost:3000/v1/api/open/:stockName`
### Method: GET
### Description: Retrieves the open interest data for the specified stock name.
### Parameters: stockName (required): The name of the stock (e.g., NIFTY).  

   ```bash
    curl -X GET http://localhost:3000/v1/api/open/nifty
   ```

3. ### Get Current Price by Stock Name.

### URL: `http://localhost:3000/v1/api/stocks/:stockName`
### Method: GET
### Description: Retrieves the current price of the specified stock name.
### Parameters: stockName (required): The name of the stock (e.g., NIFTY).  

   ```bash
    curl -X GET http://localhost:3000/v1/api/stocks/NIFTY
   ```

4. ### Get All Equity Data.

### URL: `http://localhost:3000/v1/api/eqstocks`
### Method: `GET`
### Description: Retrieves all equity data available.
### Parameters: stockName (required): The name of the stock (e.g., NIFTY).  

   ```bash
    curl -X GET http://localhost:3000/v1/api/eqstocks
   ```

5. ### Calculate Sum of Open Interest.

### URL: `http://localhost:3000/v1/api/calculate/sum`
### Method: `GET`
### Description: Calculates and returns the sum of the open interest data.

   ```bash
    curl -X GET http://localhost:3000/v1/api/calculate/sum
   ```


## Contributing
### Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

### License
### This project is licensed under the MIT License - see the LICENSE file for details.


### This README file provides a comprehensive guide to installing, using, and contributing to your API. Feel free to customize it further based on your project's specific needs.

