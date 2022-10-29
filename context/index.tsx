import { createContext } from "react";

type ContextProps = {
  loading: boolean;
  handleLoading: (state: boolean) => void;
};

export const Context = createContext({} as ContextProps);
