import { api } from "./api.js";
import { $, badgeStatus, esc, mostrarErro } from "./utils.js";
import { PRIORIDADE_LABEL, STATUS_LABEL } from "./types.js";
const conteudo = $("conteudo");
function contar(chamados, campo, valor) {
    return chamados.filter((c) => c[campo] === valor).length;
}
function barra(rotulo, qtd, total, cor) {
    const pct = total === 0 ? 0 : Math.round((qtd / total) * 100);
    return `
    <div class="barra-linha">
      <div class="barra-topo"><span>${esc(rotulo)}</span><strong>${qtd}</strong></div>
      <div class="barra-trilho"><div class="barra-fill" style="width:${pct}%;background:${cor}"></div></div>
    </div>`;
}
function renderizar(chamados) {
    const total = chamados.length;
    const abertos = contar(chamados, "status", "ABERTO");
    const emAtendimento = contar(chamados, "status", "EM_ATENDIMENTO");
    const resolvidos = contar(chamados, "status", "RESOLVIDO");
    const recentes = [...chamados]
        .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
        .slice(0, 5);
    const urgentes = chamados
        .filter((c) => c.prioridade === "ALTA" && c.status !== "RESOLVIDO")
        .slice(0, 5);
    const linhaChamado = (c) => `
    <tr data-id="${c.id}">
      <td class="col-id">#${c.id}</td>
      <td class="col-titulo">${esc(c.titulo)}</td>
      <td>${badgeStatus(c.status)}</td>
    </tr>`;
    const tabela = (lista, vazio) => lista.length === 0
        ? `<div class="estado">${vazio}</div>`
        : `<div class="tabela-wrap"><table><tbody>${lista.map(linhaChamado).join("")}</tbody></table></div>`;
    conteudo.innerHTML = `
    <div class="grid-cards">
      <div class="card stat total"><div class="valor">${total}</div><div class="rotulo">Total de chamados</div></div>
      <div class="card stat s-aberto"><div class="valor">${abertos}</div><div class="rotulo">Abertos</div></div>
      <div class="card stat s-atendimento"><div class="valor">${emAtendimento}</div><div class="rotulo">Em atendimento</div></div>
      <div class="card stat s-resolvido"><div class="valor">${resolvidos}</div><div class="rotulo">Resolvidos</div></div>
    </div>

    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <h2>Por status</h2>
        ${barra(STATUS_LABEL.ABERTO, abertos, total, "var(--aberto)")}
        ${barra(STATUS_LABEL.EM_ATENDIMENTO, emAtendimento, total, "var(--atendimento)")}
        ${barra(STATUS_LABEL.RESOLVIDO, resolvidos, total, "var(--resolvido)")}
      </div>
      <div class="card">
        <h2>Por prioridade</h2>
        ${barra(PRIORIDADE_LABEL.ALTA, contar(chamados, "prioridade", "ALTA"), total, "var(--alta)")}
        ${barra(PRIORIDADE_LABEL.MEDIA, contar(chamados, "prioridade", "MEDIA"), total, "var(--media)")}
        ${barra(PRIORIDADE_LABEL.BAIXA, contar(chamados, "prioridade", "BAIXA"), total, "var(--baixa)")}
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <h2>Chamados recentes</h2>
        ${tabela(recentes, "Nenhum chamado ainda.")}
      </div>
      <div class="card">
        <h2>Prioridade alta em aberto</h2>
        ${tabela(urgentes, "Nada urgente por aqui 🎉")}
      </div>
    </div>`;
    conteudo.querySelectorAll("tr[data-id]").forEach((tr) => {
        tr.addEventListener("click", () => {
            window.location.href = `chamado.html?id=${tr.dataset.id}`;
        });
    });
}
async function iniciar() {
    try {
        const chamados = await api.listar();
        renderizar(chamados);
    }
    catch (e) {
        mostrarErro(conteudo, e.message);
    }
}
iniciar();
