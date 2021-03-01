import React, { useContext } from 'react';
import { AppContext } from './context/Context';
import Image from './Image';

/**
 * @function ImagesWrapper
 * Wrapper that contains all the rendered Image components
 */

export default function ImagesWrapper() {
  const appContext = useContext(AppContext);

  return (
    <div id="cards-wrapper">
      <div className="container">
        {appContext.images.map((image) => {
          return <Image key={image.id} {...image} />;
        })}
      </div>
    </div>
  );
}
