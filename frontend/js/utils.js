import { PRIORIDADE_LABEL, STATUS_LABEL } from "./types.js";
export function $(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Elemento #${id} não encontrado`);
    return el;
}
export function esc(texto) {
    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
export function formatarData(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime()))
        return "-";
    return d.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
export function badgeStatus(status) {
    const label = STATUS_LABEL[status] ?? status;
    return `<span class="badge status-${esc(status.toLowerCase())}">${esc(label)}</span>`;
}
export function badgePrioridade(prioridade) {
    const label = PRIORIDADE_LABEL[prioridade] ?? prioridade;
    return `<span class="badge prio-${esc(prioridade.toLowerCase())}">${esc(label)}</span>`;
}
export function mostrarToast(mensagem, tipo = "sucesso") {
    let container = document.getElementById("toasts");
    if (!container) {
        container = document.createElement("div");
        container.id = "toasts";
        document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}
export function mostrarErro(container, mensagem) {
    container.innerHTML = `<div class="estado erro">⚠️ ${esc(mensagem)}</div>`;
}
