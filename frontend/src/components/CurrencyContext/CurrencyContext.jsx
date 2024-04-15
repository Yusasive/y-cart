// CurrencyContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(`${server}/exchangeRate`);
        const data = response.data;

        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{ selectedCurrency, setSelectedCurrency, exchangeRates }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};
