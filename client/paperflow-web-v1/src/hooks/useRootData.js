import { useObserver, useLocalStore } from 'mobx-react-lite';
import React, { useContext, createContext } from 'react';

import createRootStore from '../stores/root';

const context = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createRootStore);

  return <context.Provider value={store}>{children}</context.Provider>;
};

const useStoreData = (context, dataSelector) => {
  const store = useContext(context);
  return useObserver(() => dataSelector(store));
};

export default (selector) => useStoreData(context, selector);
