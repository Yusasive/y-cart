const express = require("express");
const router = express.Router();
const axios = require("axios"); // Import Axios

let cachedRates = null;

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(
      "https://openexchangerates.org/api/latest.json?app_id=da972036d45b4aaa849ab8720272e56f"
    );

    if (response.data && response.data.rates) {
      cachedRates = response.data.rates;
    } else {
      console.error("Invalid response format from exchange rates API.");
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
};

// Fetch exchange rates on server startup
fetchExchangeRates();

// Set up a route to provide exchange rates to clients
router.get("/", (req, res) => {
  res.json({ rates: cachedRates });
});

// Schedule hourly fetch of exchange rates
setInterval(fetchExchangeRates, 3600000); // 1 hour in milliseconds

module.exports = router;
