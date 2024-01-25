/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ReactChildren } from "../types";
import { useContextStore } from "../hooks/hooks";

export type TAuthContextData = {
  accessToken: string;
  email: string;
  uid: string;
  role: string;
} | null;

export type TAuthContext = {
  auth: TAuthContextData;
  setAuth: Dispatch<SetStateAction<TAuthContextData>>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const AuthContextProvider = ({ children }: ReactChildren) => {
  const { getContext, setContext } = useContextStore();
  const [auth, setAuth] = useState<TAuthContextData>(
    typeof window !== "undefined" && getContext("auth")
      ? getContext("auth")
      : null
  );

  useEffect(() => {
    setContext("auth", auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context must be invoked from Wrapper boundary!");
  }

  return context;
};
