import { API_URL } from "./config.js";
import type { Chamado, NovoChamado } from "./types.js";

async function request<T>(caminho: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API_URL + caminho, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  } catch {
    throw new Error("Não foi possível conectar à API. Verifique se o servidor está rodando.");
  }

  if (!res.ok) {
    let mensagem = `Erro ${res.status} ao comunicar com a API.`;
    try {
      const corpo = await res.json();
      mensagem = corpo.erro || corpo.error || corpo.message || mensagem;
    } catch {
      /* resposta sem JSON */
    }
    throw new Error(mensagem);
  }

  return (await res.json()) as T;
}

export const api = {
  listar: () => request<Chamado[]>(""),
  buscarPorId: (id: number) => request<Chamado>(`/${id}`),
  criar: (dados: NovoChamado) =>
    request<Chamado>("", { method: "POST", body: JSON.stringify(dados) }),
  atualizarStatus: (id: number, status: string) =>
    request<Chamado>(`/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
