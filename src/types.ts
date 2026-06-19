export interface Setor {
  id_setor: number;
  nome_distrito: string;
  zona: string;
  status_seguranca: "ESTAVEL" | "CRITICO";
  populacao: number;
}

export interface QueryResultData {
  columns: string[];
  values: any[][];
}