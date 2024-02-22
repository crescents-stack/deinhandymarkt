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

// value type
export type TAuthContextData = {
  accessToken: string;
  email: string;
  uid: string;
  role: string;
} | null;

// context type
export type TAuthContext = {
  auth: TAuthContextData;
  setAuth: Dispatch<SetStateAction<TAuthContextData>>;
};

// creating context
const AuthContext = createContext<TAuthContext>({
  auth: null,
  setAuth: () => {},
});

// context provider
export const AuthContextProvider = ({ children }: ReactChildren) => {
  // hooks to make persistant: auth context
  const { getContext, setContext } = useContextStore();
  const [auth, setAuth] = useState<TAuthContextData>(
    typeof window !== "undefined" && getContext("auth")
      ? getContext("auth")
      : null
  );

  // updating persistancy as auth changes
  useEffect(() => {
    setContext("auth", auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context must be invoked from Wrapper boundary!");
  }

  return context;
};
