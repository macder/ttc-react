import React from 'react'
import { SearchForm } from '../modules/search';

const App = () => {
  console.log('App render');
  return (
  <div>
    <h1>TTC NextBus</h1>
    <SearchForm />
  </div>
  );
}

export default App
