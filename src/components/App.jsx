import React from 'react'
import { SearchForm } from '../modules/search';

const App = ({ match: { params } }) => {
  console.dir(params);
  return (
  <div>
    <h1>TTC NextBus</h1>
    <SearchForm route={params.route} />
  </div>
  );
}

export default App
