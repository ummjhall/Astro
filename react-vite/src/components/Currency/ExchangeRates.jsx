import { useEffect, useState } from 'react';
import './exchange-rates.css';
import ExchangeRow from './ExchangeRow';

function ExchangeRates() {
  const [ currencyData, setCurrencyData ] = useState({});


  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
    .then(res => res.json())
    .then(data => setCurrencyData(data));
  }, []);


  return (
    <div className='exchange-wrapper'>
      <div className='exchange-title'>Latest Exchange Rates</div>
      <div className='exchange-rates-container'>
        <ExchangeRow cName={'test'} cValue={123.45678900} />
      </div>
    </div>
  );
}

export default ExchangeRates;
