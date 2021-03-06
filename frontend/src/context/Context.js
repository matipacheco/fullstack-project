import { createContext } from 'react';

export const AppContext = createContext({
  user: {},
  images: [],
  error: false,
  searchTerm: '',
});

export const AppContextProvider = AppContext.Provider;
