import React from 'react';
import Search from './Search';
import ImagesWrapper from './ImagesWrapper';
import './App.scss'

/**
 * @function App
 * Application wrapper. It renders all the application's components.
 */

function App() {
  return (
    <div>
      <Search />
      <ImagesWrapper />
    </div>
  );
}

export default App;
