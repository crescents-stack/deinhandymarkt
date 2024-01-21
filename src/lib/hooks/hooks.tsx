// useStore.ts
import { useState, useEffect } from "react";

export const useLocalhost = () => {
  const get = (name: string) => {
    try {
      return JSON.parse(window.localStorage.getItem(name)!);
    } catch (error) {
      console.log(error);
    }
  };
  const set = (name: string, value: unknown) => {
    try {
      window.localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  const remove = (name: string) => {
    try {
      window.localStorage.removeItem(name);
    } catch (error) {
      console.log(error);
    }
  };

  return { get, set, remove };
};

export const useContextStore = () => {
  const { get, set, remove } = useLocalhost();
  const setContext = (name: string, context: any) => {
    set(name, context);
  };
  const getContext = (name: string) => {
    return get(name);
  };
  const removeContext = (name: string) => {
    remove(name);
  };

  return { getContext, setContext, removeContext };
};
