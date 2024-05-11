import './exchange-rate.css';

function ExchangeRate({ cName, cValue }) {

  return (
    <div className='exchange-wrapper'>
      <div className='exchange-currency'>{cName}</div>
      <div className='exchange-value'>{cValue}</div>
    </div>
  );
}

export default ExchangeRate;
