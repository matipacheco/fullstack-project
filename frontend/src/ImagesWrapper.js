import React, { useContext } from 'react';
import { AppContext } from './context/Context';
import Image from './Image';
import _ from 'lodash';

/**
 * @function ImagesWrapper
 * Wrapper that contains all the rendered Image components
 */

export default function ImagesWrapper() {
  const appContext = useContext(AppContext);

  return (
    <div id="cards-wrapper" className="container">
      {appContext.error ? (
        <ErrorView />
      ) : _.isEmpty(appContext.images) ? (
        <EmptyView />
      ) : (
        appContext.images.map((image) => {
          return <Image key={image.id} {...image} />;
        })
      )}
    </div>
  );
}

function EmptyView() {
  return (
    <div className="empty">
      <h3>Looking for a cool GIF?</h3>
      <p>Search something!</p>
    </div>
  );
}

function ErrorView() {
  return (
    <div className="empty">
      <h3>An error has occured</h3>
      <p>Try again later</p>
    </div>
  );
}
