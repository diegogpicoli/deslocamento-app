import { Dayjs } from "dayjs";

export interface ClientData {
  id: number;
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface ConductorData {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  catergoriaHabilitacao?: string;
  vencimentoHabilitacao: string;
}

export interface VehiclesData {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface DisplacementsData {
  id: number;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string;
  fimDeslocamento: null | string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
}
