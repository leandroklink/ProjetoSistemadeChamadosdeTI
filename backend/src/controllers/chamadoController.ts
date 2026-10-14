import { Request, Response } from "express";
import { chamadoService } from "../services/chamadoService";

export class ChamadoController {

    listar(req: Request, res: Response) {

        const chamados = chamadoService.listarTodos();

        return res.json(chamados);
    }

    buscarPorId(req: Request, res: Response) {

        const id = Number(req.params.id);

        const chamado = chamadoService.buscarPorId(id);

        if (!chamado) {
            return res.status(404).json({
                erro: "Chamado não encontrado"
            });
        }

        return res.json(chamado);
    }

    criar(req: Request, res: Response) {

        const { titulo, descricao, categoria, prioridade } = req.body;

        if (!titulo || !descricao || !categoria || !prioridade) {
            return res.status(400).json({
                erro: "Todos os campos são obrigatórios"
            });
        }

        const novoChamado = chamadoService.criar({
            titulo,
            descricao,
            categoria,
            prioridade
        });

        return res.status(201).json(novoChamado);
    }

    atualizarStatus(req: Request, res: Response) {

        const id = Number(req.params.id);
        const { status } = req.body;

        const statusValidos = [
            "ABERTO",
            "EM ATENDIMENTO",
            "RESOLVIDO"
        ];

        if (!statusValidos.includes(status)) {
            return res.status(400).json({
                erro: "Status inválido"
            });
        }

        const chamado = chamadoService.atualizarStatus(id, status);

        if (!chamado) {
            return res.status(404).json({
                erro: "Chamado não encontrado"
            });
        }

        return res.json(chamado);
    }
}

export const chamadoController = new ChamadoController();

//Tratamento de requisições HTTP.

