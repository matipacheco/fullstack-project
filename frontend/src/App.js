import React, { useContext } from 'react';
import { AppContext } from './context/Context';
import Search from './Search';
import { ErrorView, EmptyView } from './commons';
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

      {appContext.error ? <ErrorView /> : _.isEmpty(appContext.images) ? <EmptyView /> : void 0}
    </div>
  );
}

export default App;
