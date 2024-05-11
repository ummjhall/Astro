import './exchange-row.css';

function ExchangeRow({ cName, cValue }) {

  return (
    <div className='exchange-row-wrapper'>
      <span className='exchange-row-currency'>{cName}</span>
      <span className='exchange-row-value'>{cValue}</span>
    </div>
  );
}

export default ExchangeRow;
