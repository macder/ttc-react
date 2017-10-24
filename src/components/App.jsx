import React from 'react'
import { SearchForm } from '../modules/search';
import { PredictionsContainer as Predictions } from '../modules/predictions';

const App = () => (
  <div>
    <h1>TTC NextBus</h1>
    <SearchForm />
    <Predictions />
  </div>
);

export default App
