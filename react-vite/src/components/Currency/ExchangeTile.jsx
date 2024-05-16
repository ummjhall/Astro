import './exchange-tile.css';

function ExchangeTile({ cName, cValue }) {

  return (
    <div className='exchange-tile-wrapper'>
      <div className='exchange-tile-currency'>{cName}</div>
      <div className='exchange-tile-value'>{cValue}</div>
    </div>
  );
}

export default ExchangeTile;
