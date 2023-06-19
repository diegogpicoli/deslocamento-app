"use client";
import { ReactNode, createContext, useState } from "react";

export interface MainContextData {
  searchValue: string;
  setSearchValue: (dados: string) => void;
}

interface MainContextProviderProps {
  children: ReactNode;
}

export const myContext = createContext<MainContextData>({} as MainContextData);

function MainContext({ children }: MainContextProviderProps) {
  const [searchValue, setSearchValue] = useState("Dados iniciais");
  return (
    <myContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </myContext.Provider>
  );
}
export default MainContext;
