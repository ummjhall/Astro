import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css';

function Search() {
  const navigate = useNavigate();
  const [ searchTerms, setSearchTerms ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerms == '') return;
    setSearchTerms('');
    navigate(`/search-results?${searchTerms}`);
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
