import { createContext } from 'react';

export const BreadcrumbsContext = createContext({
   currentBreadcrumb: null,
   setCurrentBreadcrumb: () => {}
});
