import { api } from "./api.js";
import { $, badgePrioridade, badgeStatus, esc, formatarData, mostrarErro, mostrarToast } from "./utils.js";
import { FLUXO_STATUS, STATUS_LABEL, type Chamado } from "./types.js";

const conteudo = $("conteudo");

function obterId(): number | null {
  const valor = new URLSearchParams(window.location.search).get("id");
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function stepper(statusAtual: string): string {
  const indiceAtual = FLUXO_STATUS.indexOf(statusAtual as (typeof FLUXO_STATUS)[number]);
  return FLUXO_STATUS.map((s, i) => {
    const classe = i < indiceAtual ? "feito" : i === indiceAtual ? "atual" : "";
    const marca = i < indiceAtual ? "✓" : String(i + 1);
    const linha = i < FLUXO_STATUS.length - 1
      ? `<div class="linha-passo ${i < indiceAtual ? "feito" : ""}"></div>`
      : "";
    return `
      <div class="passo ${classe}">
        <div class="bolinha">${marca}</div>
        <div class="nome">${esc(STATUS_LABEL[s])}</div>
      </div>${linha}`;
  }).join("");
}

function botaoAcao(c: Chamado): string {
  if (c.status === "ABERTO") {
    return `<button class="btn" id="btn-avancar" data-novo="EM_ATENDIMENTO">▶ Iniciar atendimento</button>`;
  }
  if (c.status === "EM_ATENDIMENTO") {
    return `<button class="btn btn-success" id="btn-avancar" data-novo="RESOLVIDO">✓ Marcar como resolvido</button>`;
  }
  return `<span class="badge status-resolvido">Chamado concluído</span>`;
}

function renderizar(c: Chamado): void {
  document.title = `HelpDesk — Chamado #${c.id}`;

  conteudo.innerHTML = `
    <div class="detalhe-topo">
      <div>
        <h1>#${c.id} · ${esc(c.titulo)}</h1>
        <div class="meta">${badgeStatus(c.status)} ${badgePrioridade(c.prioridade)}</div>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <h2>Andamento</h2>
      <div class="stepper">${stepper(c.status)}</div>
      <div class="acoes-status">${botaoAcao(c)}</div>
    </div>

    <div class="card" style="margin-bottom:16px">
      <h2>Descrição</h2>
      <p class="descricao">${esc(c.descricao)}</p>
    </div>

    <div class="card">
      <h2>Informações</h2>
      <dl class="info-lista">
        <div><dt>Categoria</dt><dd>${esc(c.categoria)}</dd></div>
        <div><dt>Aberto em</dt><dd>${formatarData(c.criadoEm)}</dd></div>
        <div><dt>Última atualização</dt><dd>${formatarData(c.atualizadoEm)}</dd></div>
      </dl>
    </div>`;

  const btn = document.getElementById("btn-avancar") as HTMLButtonElement | null;
  btn?.addEventListener("click", async () => {
    const novoStatus = btn.dataset.novo!;
    btn.disabled = true;
    try {
      await api.atualizarStatus(c.id, novoStatus);
      mostrarToast(`Status alterado para "${STATUS_LABEL[novoStatus]}".`);
      // Recarrega do servidor para garantir que o que aparece é o que foi salvo.
      renderizar(await api.buscarPorId(c.id));
    } catch (e) {
      mostrarToast((e as Error).message, "erro");
      btn.disabled = false;
    }
  });
}

async function iniciar(): Promise<void> {
  const id = obterId();
  if (id === null) {
    mostrarErro(conteudo, "Chamado inválido. Volte para a lista e escolha um chamado.");
    return;
  }
  try {
    renderizar(await api.buscarPorId(id));
  } catch (e) {
    mostrarErro(conteudo, (e as Error).message);
  }
}

iniciar();
