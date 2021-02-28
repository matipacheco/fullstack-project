import React from 'react';
import NavBar from './NavBar';
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
        <NavBar />
        <Search />

        <ImagesWrapper />
      </ProviderWrapper>
    </div>
  );
}

export default App;
