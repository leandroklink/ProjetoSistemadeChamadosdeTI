import { API_URL } from "./config.js";
async function request(caminho, init) {
    let res;
    try {
        res = await fetch(API_URL + caminho, {
            headers: { "Content-Type": "application/json" },
            ...init,
        });
    }
    catch {
        throw new Error("Não foi possível conectar à API. Verifique se o servidor está rodando.");
    }
    if (!res.ok) {
        let mensagem = `Erro ${res.status} ao comunicar com a API.`;
        try {
            const corpo = await res.json();
            mensagem = corpo.erro || corpo.error || corpo.message || mensagem;
        }
        catch {
            /* resposta sem JSON */
        }
        throw new Error(mensagem);
    }
    return (await res.json());
}
export const api = {
    listar: () => request(""),
    buscarPorId: (id) => request(`/${id}`),
    criar: (dados) => request("", { method: "POST", body: JSON.stringify(dados) }),
    atualizarStatus: (id, status) => request(`/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
    }),
};
