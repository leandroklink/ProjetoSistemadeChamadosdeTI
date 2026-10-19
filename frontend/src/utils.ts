import { PRIORIDADE_LABEL, STATUS_LABEL } from "./types.js";

export function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Elemento #${id} não encontrado`);
  return el as T;
}

export function esc(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatarData(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function badgeStatus(status: string): string {
  const label = STATUS_LABEL[status] ?? status;
  return `<span class="badge status-${esc(status.toLowerCase())}">${esc(label)}</span>`;
}

export function badgePrioridade(prioridade: string): string {
  const label = PRIORIDADE_LABEL[prioridade] ?? prioridade;
  return `<span class="badge prio-${esc(prioridade.toLowerCase())}">${esc(label)}</span>`;
}

export function mostrarToast(mensagem: string, tipo: "sucesso" | "erro" = "sucesso"): void {
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

export function mostrarErro(container: HTMLElement, mensagem: string): void {
  container.innerHTML = `<div class="estado erro">⚠️ ${esc(mensagem)}</div>`;
}
