import { api } from "./api.js";
import { $, mostrarToast } from "./utils.js";
import { CATEGORIAS, PRIORIDADE_LABEL } from "./types.js";
const form = $("form-chamado");
const titulo = $("titulo");
const categoria = $("categoria");
const prioridade = $("prioridade");
const descricao = $("descricao");
const contagem = $("contagem");
const btnEnviar = $("btn-enviar");
CATEGORIAS.forEach((c) => categoria.add(new Option(c, c)));
Object.entries(PRIORIDADE_LABEL).forEach(([v, l]) => prioridade.add(new Option(l, v)));
prioridade.value = "MEDIA";
descricao.addEventListener("input", () => {
    contagem.textContent = String(descricao.value.length);
});
function definirErro(campo, id, mensagem) {
    $(`erro-${id}`).textContent = mensagem;
    campo.classList.toggle("invalido", mensagem !== "");
}
function validar() {
    let ok = true;
    const regras = [
        [titulo, "titulo", titulo.value.trim().length < 5 ? "Informe um título com pelo menos 5 caracteres." : ""],
        [categoria, "categoria", categoria.value === "" ? "Selecione uma categoria." : ""],
        [prioridade, "prioridade", prioridade.value === "" ? "Selecione uma prioridade." : ""],
        [descricao, "descricao", descricao.value.trim().length < 10 ? "Descreva o problema com pelo menos 10 caracteres." : ""],
    ];
    for (const [campo, id, erro] of regras) {
        definirErro(campo, id, erro);
        if (erro)
            ok = false;
    }
    return ok;
}
form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (!validar())
        return;
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";
    try {
        const criado = await api.criar({
            titulo: titulo.value.trim(),
            descricao: descricao.value.trim(),
            categoria: categoria.value,
            prioridade: prioridade.value,
        });
        mostrarToast("Chamado aberto com sucesso!");
        setTimeout(() => {
            window.location.href = criado?.id ? `chamado.html?id=${criado.id}` : "chamados.html";
        }, 700);
    }
    catch (e) {
        mostrarToast(e.message, "erro");
        btnEnviar.disabled = false;
        btnEnviar.textContent = "Abrir chamado";
    }
});
