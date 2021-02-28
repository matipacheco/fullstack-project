import React from 'react';
import Search from './Search';
import ImagesWrapper from './ImagesWrapper';
import ProviderWrapper from './context/ContextProvider';
import './App.scss'

/**
 * @function App
 * Application wrapper. It renders all the application's components.
 */

function App() {
  return (
    <div>
      <ProviderWrapper>
        <Search />

        <ImagesWrapper />
      </ProviderWrapper>
    </div>
  );
}

export default App;
