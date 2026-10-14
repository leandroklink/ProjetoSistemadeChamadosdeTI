import { Chamado } from "../types/chamado";

let chamados: Chamado[] = [];
let proximoId = 1;

export class ChamadoService {

    listarTodos(): Chamado[] {
        return chamados;
    }

    buscarPorId(id: number): Chamado | undefined {
        return chamados.find(chamado => chamado.id === id);
    }

    criar(dados: Omit<Chamado, "id" | "status">): Chamado {

        const novoChamado: Chamado = {
            id: proximoId++,
            ...dados,
            status: "ABERTO"
        };

        chamados.push(novoChamado);

        return novoChamado;
    }

    atualizarStatus(
        id: number,
        status: Chamado["status"]
    ): Chamado | undefined {

        const chamado = this.buscarPorId(id);

        if (!chamado) {
            return undefined;
        }

        chamado.status = status;

        return chamado;
    }
}

export const chamadoService = new ChamadoService();

// Lógica responsável por gerenciar os chamados, 
// incluindo a criação, atualização e listagem dos mesmos.