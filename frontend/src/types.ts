export type Status = "ABERTO" | "EM_ATENDIMENTO" | "RESOLVIDO";
export type Prioridade = "BAIXA" | "MEDIA" | "ALTA";

// Espelha o model Chamado do Prisma.
export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: string;
  status: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface NovoChamado {
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: string;
}

// Fluxo do chamado: ABERTO -> EM_ATENDIMENTO -> RESOLVIDO
export const FLUXO_STATUS: Status[] = ["ABERTO", "EM_ATENDIMENTO", "RESOLVIDO"];

export const STATUS_LABEL: Record<string, string> = {
  ABERTO: "Aberto",
  EM_ATENDIMENTO: "Em atendimento",
  RESOLVIDO: "Resolvido",
};

export const PRIORIDADE_LABEL: Record<string, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
};

export const CATEGORIAS: string[] = [
  "Hardware",
  "Software",
  "Rede / Internet",
  "Acesso / Senha",
  "E-mail",
  "Impressora",
  "Outros",
];
