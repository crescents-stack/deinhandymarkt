"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { ReactChildren } from "../types";
export type UserData = {
    data: any,
    token: string
}
export type UserContext = {
    UserData: UserData | null,
    setUserData: Dispatch<SetStateAction<null>>
}

const UserContext = createContext<UserContext | null>(null);

const UserContextProvider = ({ children }: ReactChildren) => {
  const [UserData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{ UserData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext must be usded within ContextWrapper");
  }

  return context;
};
