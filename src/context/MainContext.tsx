"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";

export interface MainContextData {
  searchValue: string;
  setSearchValue: (dados: string) => void;
  typeFilter: string;
  setTypeFilter: (dados: string) => void;
}

interface MainContextProviderProps {
  children: ReactNode;
}

export const myContext = createContext<MainContextData>({} as MainContextData);

function MainContext({ children }: MainContextProviderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);
  console.log(searchValue);
  return (
    <myContext.Provider
      value={{ searchValue, setSearchValue, typeFilter, setTypeFilter }}
    >
      {children}
    </myContext.Provider>
  );
}
export default MainContext;
