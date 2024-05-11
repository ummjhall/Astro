import './exchange-row.css';

function ExchangeRow({ cName, cValue }) {

  return (
    <div className='exchange-row-wrapper'>
      <span>{cName}</span>
      <span>{cValue}</span>
    </div>
  );
}

export default ExchangeRow;
