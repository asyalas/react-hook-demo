import * as React from "react";
let globalContext = {};
export function useContext(namespace) {
  const context = globalContext[namespace];
  return {
    ...React.useContext(context),
    dispatch: context.dispatch,
    getState: context.getState
  };
}
useContext.getGlobal = () =>
  Object.keys(globalContext).reduce((p, key) => {
    p[key] = useContext(key);
    return p;
  }, {});
export function createGlobalContext(namespace, initialState) {
  const Context = React.createContext(initialState);
  if (globalContext.namespace) {
    throw new Error("the Context has mounted");
  }
  globalContext[namespace] = Context;
  const NativeProvider = Context.Provider;
  Context.Provider = ({ children }) => {
    const [state, setState] = React.useState(initialState);

    Context.dispatch = setState;
    Context.getState = () => state;
    return React.createElement(NativeProvider, { value: state }, children);
  };

  Context.dispatch = Context.read = () => {
    throw new Error("ContextIO not mount");
  };

  return Context;
}
