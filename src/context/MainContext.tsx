"use client";

import React, { ReactNode, createContext, useState } from "react";

import { ClientData, ConductorData, VehiclesData } from "@/interfaces/types";

export interface MainContextData {
  searchValue: string;
  setSearchValue: (dados: string) => void;
  typeFilter: string;
  setTypeFilter: (dados: string) => void;
  attTables: boolean;
  setAttTables: (b: boolean) => void;
  clients: ClientData[];
  setClients: (clients: ClientData[]) => void;
  conductors: ConductorData[];
  setConductors: (conductor: ConductorData[]) => void;
  vehicles: VehiclesData[];
  setVehicles: (vehicle: VehiclesData[]) => void;
}

interface MainContextProviderProps {
  children: ReactNode;
}

export const myContext = createContext<MainContextData>({} as MainContextData);

function MainContext({ children }: MainContextProviderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [attTables, setAttTables] = useState(false);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [conductors, setConductors] = useState<ConductorData[]>([]);
  const [vehicles, setVehicles] = useState<VehiclesData[]>([]);

  return (
    <myContext.Provider
      value={{
        searchValue,
        setSearchValue,
        typeFilter,
        setTypeFilter,
        attTables,
        setAttTables,
        clients,
        setClients,
        conductors,
        setConductors,
        vehicles,
        setVehicles
      }}
    >
      {children}
    </myContext.Provider>
  );
}
export default MainContext;
