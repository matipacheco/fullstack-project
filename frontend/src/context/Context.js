import { createContext } from 'react';

export const AppContext = createContext({
  images: [],
  error: false,
});

export const AppContextProvider = AppContext.Provider;
