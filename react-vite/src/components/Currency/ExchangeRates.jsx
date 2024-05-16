import { useEffect, useState } from 'react';
import ExchangeRow from './ExchangeRow';
import './exchange-rates.css';

function ExchangeRates() {
  const [ currencyData, setCurrencyData ] = useState({});
  const [ currencies, setCurrencies ] = useState([]);


  // Get currency exchange data from github.com/fawazahmed0/exchange-api
  // Use USD as base currency and filter out currencies with rate less than 1
  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
    .then(res => res.json())
    .then(data => {
      setCurrencyData(data);
      setCurrencies(Object.keys(data.usd).filter(rate => data.usd[rate] > 1))
    });
  }, []);


  return (
    <div className='exchange-wrapper'>
      <div className='exchange-title'>Latest Exchange Rates</div>
      <div className='exchange-subheading'>ঋ 1 USC = ......</div>
      <div className='exchange-rates-container'>
        {currencyData.usd && currencies.map(currency => (
          <ExchangeRow key={currency} cName={currency} cValue={currencyData.usd[currency]} />
        ))}
      </div>
    </div>
  );
}

export default ExchangeRates;
