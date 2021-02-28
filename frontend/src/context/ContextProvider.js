import React, { useState, useContext } from 'react';
import { AppContext, AppContextProvider } from './Context';

const ProviderWrapper = (props) => {
  const appContext = useContext(AppContext);
  const [images, setImages] = useState(appContext.images);

  const updateImages = (images) => {
    setImages(images);
  };

  const provider = {
    images,
    updateImages,
  };

  return <AppContextProvider value={provider}>{props.children}</AppContextProvider>;
}

export default ProviderWrapper;
