import { createContext } from 'react';

export const AppContext = createContext({
  user: {},
  images: [],
  error: false,
});

export const AppContextProvider = AppContext.Provider;
