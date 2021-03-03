import React, { useState, useContext } from 'react';
import { AppContext, AppContextProvider } from './Context';

const ProviderWrapper = (props) => {
  const appContext = useContext(AppContext);
  const [user, setUser] = useState(appContext.user);
  const [error, setError] = useState(appContext.error);
  const [images, setImages] = useState(appContext.images);
  const [searchTerm, setSearchTerm] = useState(appContext.images);

  const updateImages = (images) => {
    setImages(images);
  };

  const updateError = (value) => {
    setError(value);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const updateSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const provider = {
    user,
    error,
    images,
    searchTerm,
    updateUser,
    updateError,
    updateImages,
    updateSearchTerm,
  };

  return <AppContextProvider value={provider}>{props.children}</AppContextProvider>;
};

export default ProviderWrapper;
