import { createContext } from 'react';

export const AppContext = createContext({
  images: [],
});

export const AppContextProvider = AppContext.Provider;
