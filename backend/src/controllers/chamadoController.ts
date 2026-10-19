import { Request, Response } from "express";
import { chamadoService } from "../services/chamadoService";

export class ChamadoController {

    async listar(req: Request, res: Response) {
        try {
            const chamados = await chamadoService.listarTodos();
            return res.json(chamados);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor" });
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id)) {
                return res.status(400).json({ erro: "ID inválido" });
            }

            const chamado = await chamadoService.buscarPorId(id);

            if (!chamado) {
                return res.status(404).json({ erro: "Chamado não encontrado" });
            }

            return res.json(chamado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor" });
        }
    }

    async criar(req: Request, res: Response) {
        try {
            const { titulo, descricao, categoria, prioridade } = req.body;

            if (!titulo || !descricao || !categoria || !prioridade) {
                return res.status(400).json({
                    erro: "Todos os campos são obrigatórios"
                });
            }

            const novoChamado = await chamadoService.criar({
                titulo,
                descricao,
                categoria,
                prioridade
            });

            return res.status(201).json(novoChamado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor" });
        }
    }

    async atualizarStatus(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;

            if (!Number.isInteger(id)) {
                return res.status(400).json({ erro: "ID inválido" });
            }

            const statusValidos = ["ABERTO", "EM ATENDIMENTO", "RESOLVIDO"];

            if (!statusValidos.includes(status)) {
                return res.status(400).json({ erro: "Status inválido" });
            }

            const chamado = await chamadoService.atualizarStatus(id, status);

            if (!chamado) {
                return res.status(404).json({ erro: "Chamado não encontrado" });
            }

            return res.json(chamado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: "Erro interno do servidor" });
        }
    }
}

export const chamadoController = new ChamadoController();

// Tratamento de requisições HTTP.