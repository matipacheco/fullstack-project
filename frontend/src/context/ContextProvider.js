import React, { useState, useContext } from 'react';
import { AppContext, AppContextProvider } from './Context';

const ProviderWrapper = (props) => {
  const appContext = useContext(AppContext);
  const [error, setError] = useState(appContext.error);
  const [images, setImages] = useState(appContext.images);

  const updateImages = (images) => {
    setImages(images);
  };

  const updateError = (value) => {
    setError(value);
  };

  const provider = {
    error,
    images,
    updateError,
    updateImages,
  };

  return <AppContextProvider value={provider}>{props.children}</AppContextProvider>;
}

export default ProviderWrapper;
