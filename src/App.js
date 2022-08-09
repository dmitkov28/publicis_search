
import SearchBox from './components/SearchBox/SearchBox';
import ResultsContainer from './components/ResultsBox/ResultsContainer';
import Navigation from './components/Navigation';
import { useState } from 'react';
import WordCloud from './components/WordCloud';


function App() {
  const [search, setSearch] = useState(false)
  const [queryData, setQueryData] = useState({
    platform: '',
    searchQuery: '',
    language: '',
    country: ''
  })

  return (
    <>
      <Navigation>
      <SearchBox setSearch={setSearch} queryData={queryData} setQueryData={setQueryData} />
      {search && <ResultsContainer queryData={queryData} search={search} setSearch={setSearch} />}
      </Navigation> 
    </>
  );
}

export default App;
