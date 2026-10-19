import { api } from "./api.js";
import { $, badgePrioridade, badgeStatus, esc, formatarData, mostrarErro } from "./utils.js";
import {
  CATEGORIAS,
  FLUXO_STATUS,
  PRIORIDADE_LABEL,
  STATUS_LABEL,
  type Chamado,
} from "./types.js";

const tabela = $("tabela");
const contador = $("contador");
const busca = $<HTMLInputElement>("busca");
const filtroStatus = $<HTMLSelectElement>("filtro-status");
const filtroPrioridade = $<HTMLSelectElement>("filtro-prioridade");
const filtroCategoria = $<HTMLSelectElement>("filtro-categoria");

let todos: Chamado[] = [];

function preencherFiltros(): void {
  FLUXO_STATUS.forEach((s) => filtroStatus.add(new Option(STATUS_LABEL[s], s)));
  Object.entries(PRIORIDADE_LABEL).forEach(([v, l]) => filtroPrioridade.add(new Option(l, v)));
  CATEGORIAS.forEach((c) => filtroCategoria.add(new Option(c, c)));
}

function filtrar(): Chamado[] {
  const termo = busca.value.trim().toLowerCase().replace(/^#/, "");
  return todos.filter((c) => {
    if (filtroStatus.value && c.status !== filtroStatus.value) return false;
    if (filtroPrioridade.value && c.prioridade !== filtroPrioridade.value) return false;
    if (filtroCategoria.value && c.categoria !== filtroCategoria.value) return false;
    if (termo) {
      const alvo = `${c.id} ${c.titulo} ${c.descricao}`.toLowerCase();
      if (!alvo.includes(termo)) return false;
    }
    return true;
  });
}

function renderizar(): void {
  const lista = filtrar().sort((a, b) => b.id - a.id);
  contador.textContent = `${lista.length} de ${todos.length} chamado(s)`;

  if (lista.length === 0) {
    tabela.innerHTML = `<div class="estado"><span class="vazio-icone">📭</span>Nenhum chamado encontrado.</div>`;
    return;
  }

  tabela.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Status</th><th>Aberto em</th>
        </tr>
      </thead>
      <tbody>
        ${lista
          .map(
            (c) => `
          <tr data-id="${c.id}">
            <td class="col-id">#${c.id}</td>
            <td class="col-titulo">${esc(c.titulo)}</td>
            <td>${esc(c.categoria)}</td>
            <td>${badgePrioridade(c.prioridade)}</td>
            <td>${badgeStatus(c.status)}</td>
            <td>${formatarData(c.criadoEm)}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;

  tabela.querySelectorAll<HTMLTableRowElement>("tr[data-id]").forEach((tr) => {
    tr.addEventListener("click", () => {
      window.location.href = `chamado.html?id=${tr.dataset.id}`;
    });
  });
}

async function iniciar(): Promise<void> {
  preencherFiltros();
  [busca, filtroStatus, filtroPrioridade, filtroCategoria].forEach((el) =>
    el.addEventListener("input", renderizar)
  );

  try {
    todos = await api.listar();
    renderizar();
  } catch (e) {
    contador.textContent = "";
    mostrarErro(tabela, (e as Error).message);
  }
}

iniciar();
