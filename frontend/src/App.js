import React, { useContext } from 'react';
import { AppContext } from './context/Context';
import Search from './Search';
import { EmptySearchView } from './utils/commons';
import ImagesWrapper from './ImagesWrapper';
import './App.scss';
import _ from 'lodash';

/**
 * @function App
 * Application wrapper. It renders all the application's components.
 */

function App() {
  const appContext = useContext(AppContext);

  return (
    <div>
      <Search />
      <ImagesWrapper />

      {_.isEmpty(appContext.images) && <EmptySearchView />}
    </div>
  );
}

export default App;
