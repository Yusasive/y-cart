import React, { useEffect, useState } from "react";
import { useCurrency } from "../CurrencyContext/CurrencyContext";
import axios from "axios";

const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [clientCountry, setClientCountry] = useState(null);
  const [clientCurrency, setClientCurrency] = useState(null);

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);

    // Remove existing selectedCurrency key from localStorage
    localStorage.removeItem("selectedCurrency");

    // Store the new selected currency in localStorage
    localStorage.setItem("selectedCurrency", newCurrency);
  };

  useEffect(() => {
    // Check if the user has selected a currency manually
    const storedCurrency = localStorage.getItem("selectedCurrency");

    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    } else {
      // Fetch geo IP data if no manual selection
      const apiKey = "82e2066d9aea45ffa5d65f1ae37baf75";
      axios
        .get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`)
        .then((response) => {
          const country = response.data.country_code;
          const currency = response.data.currency.code;
          setClientCountry(country);
          setClientCurrency(currency);
          setSelectedCurrency(currency || "USD");
        })
        .catch((error) => {
          console.error("Error fetching geolocation data:", error);
        });
    }
  }, [setSelectedCurrency]);

  return (
    <select value={selectedCurrency} onChange={handleCurrencyChange}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      {/* Add more currency options as needed */}
      <option value="GNF">GNF</option>
      <option value="RWF">RWF</option>
      <option value="RUB">RUB</option>
    </select>
  );
};

export default CurrencySelector;

// import React, { useEffect, useState } from "react";
// import { useCurrency } from "../CurrencyContext/CurrencyContext";
// import axios from "axios";

// const CurrencySelector = () => {
//   const { selectedCurrency, setSelectedCurrency } = useCurrency();
//   const [userSelectedCurrency, setUserSelectedCurrency] = useState(false);

//   const handleCurrencyChange = (event) => {
//     const newCurrency = event.target.value;
//     setSelectedCurrency(newCurrency);
//     setUserSelectedCurrency(true);
//   };

//   useEffect(() => {
//     // Use the ipgeolocation.io API to get geolocation data
//     const apiKey = "82e2066d9aea45ffa5d65f1ae37baf75"; // Replace with your actual API key
//     if (!userSelectedCurrency) {
//       // Only set the selected currency if the user hasn't manually selected one
//       axios
//         .get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`)
//         .then((response) => {
//           const currency = response.data.currency.code;
//           setSelectedCurrency(currency || "USD");
//         })
//         .catch((error) => {
//           console.error("Error fetching geolocation data:", error);
//         });
//     }
//   }, [setSelectedCurrency, userSelectedCurrency]);

//   return (
//     <select value={selectedCurrency} onChange={handleCurrencyChange}>
//       <option value="USD">USD</option>
//       <option value="EUR">EUR</option>
//       <option value="GNF">GNF</option>
//       <option value="RWF">RWF</option>
//       {/* Add more currency options as needed */}
//     </select>
//   );
// };

// export default CurrencySelector;
