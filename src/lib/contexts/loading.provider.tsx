"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ReactChildren } from "../types";

type LoadingContext = {
  Loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
const LoadingContext = createContext<LoadingContext | boolean>(false);

const LoadingProvider = ({ children }: ReactChildren) => {
  const [Loading, setLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ Loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

export const useLoadingContext = () => {
  const context = useContext<any>(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be usded within ContextWrapper");
  }

  return context;
};
