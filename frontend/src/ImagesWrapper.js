import React, { useContext } from 'react';

import { AppContext } from './context/Context';
import Image from './Image';

export default function ImagesWrapper() {
  const appContext = useContext(AppContext);

  return (
    <div id="cards-wrapper" className="container">
      {appContext.images.map((image) => {
        return <Image key={image.id} {...image} />
      })}
    </div>
  )
}