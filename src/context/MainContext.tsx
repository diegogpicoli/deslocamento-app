"use client";

import React, { ReactNode, createContext, useState } from "react";

export interface MainContextData {
  searchValue: string;
  setSearchValue: (dados: string) => void;
  typeFilter: string;
  setTypeFilter: (dados: string) => void;
  attTables: boolean;
  setAttTables: (b: boolean) => void;
}

interface MainContextProviderProps {
  children: ReactNode;
}

export const myContext = createContext<MainContextData>({} as MainContextData);

function MainContext({ children }: MainContextProviderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [attTables, setAttTables] = useState(false);

  return (
    <myContext.Provider
      value={{
        searchValue,
        setSearchValue,
        typeFilter,
        setTypeFilter,
        attTables,
        setAttTables
      }}
    >
      {children}
    </myContext.Provider>
  );
}
export default MainContext;
