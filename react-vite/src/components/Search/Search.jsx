import { useState } from 'react';
import './search.css';

function Search() {
  const [ searchTerms, setSearchTerms ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className='search-wrapper'>
      <form onSubmit={handleSubmit}>
        <input
          className='search-bar'
          type='text'
          maxLength={75}
          value={searchTerms}
          onChange={e => setSearchTerms(e.target.value)}
        />
        <button className='search-submit' type='submit'>
          <div className='search-magnifying-glass'>&#9906;</div>
        </button>
      </form>
    </div>
  );
}

export default Search;
