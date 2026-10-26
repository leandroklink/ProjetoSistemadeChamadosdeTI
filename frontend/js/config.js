// Endereço base da API de chamados.
// Rodando localmente, usa a API local; no GitHub Pages, usa a API publicada.
const API_LOCAL = "http://localhost:3000/chamados";
const API_PRODUCAO = "https://helpdesk-api-ve4e.onrender.com/chamados";
const rodandoLocalmente = location.hostname === "localhost" || location.hostname === "127.0.0.1";
export const API_URL = rodandoLocalmente ? API_LOCAL : API_PRODUCAO;
