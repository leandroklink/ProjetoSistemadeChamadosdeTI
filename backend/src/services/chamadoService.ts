import { prisma } from "../database/prisma";
import { Chamado } from "../types/chamado";

const campos = {
    id: true,
    titulo: true,
    descricao: true,
    categoria: true,
    prioridade: true,
    status: true
};

export class ChamadoService {

    async listarTodos(): Promise<Chamado[]> {
        const chamados = await prisma.chamado.findMany({
            select: campos,
            orderBy: { id: "asc" }
        });

        return chamados as Chamado[];
    }

    async buscarPorId(id: number): Promise<Chamado | undefined> {
        const chamado = await prisma.chamado.findUnique({
            where: { id },
            select: campos
        });

        return (chamado as Chamado | null) ?? undefined;
    }

    async criar(dados: Omit<Chamado, "id" | "status">): Promise<Chamado> {
        const chamado = await prisma.chamado.create({
            data: { ...dados, status: "ABERTO" },
            select: campos
        });

        return chamado as Chamado;
    }

    async atualizarStatus(
        id: number,
        status: Chamado["status"]
    ): Promise<Chamado | undefined> {

        const existe = await this.buscarPorId(id);

        if (!existe) {
            return undefined;
        }

        const chamado = await prisma.chamado.update({
            where: { id },
            data: { status },
            select: campos
        });

        return chamado as Chamado;
    }
}

export const chamadoService = new ChamadoService();

// Lógica responsável por gerenciar os chamados usando Prisma + PostgreSQL.