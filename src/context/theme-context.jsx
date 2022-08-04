import { createContext } from 'react';

export const ThemeContext = createContext({
   darkMode: null,
   setDarkMode: () => {}
});
