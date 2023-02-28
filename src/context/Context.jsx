import React, { createContext, useReducer } from "react";
import { initialState, reducers } from "./reducers";

export const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const AppStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
