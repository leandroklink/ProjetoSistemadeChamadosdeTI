
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Tipo de dados de um chamado
interface Chamado {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    prioridade: string;
    status: "ABERTO" | "EM ATENDIMENTO" | "RESOLVIDO";
}

// Armazenamento temporário
let chamados: Chamado[] = [];
let proximoId = 1;

// Rota inicial
app.get("/", (req: Request, res: Response) => {
    res.json({
        mensagem: "API HelpDesk funcionando!"
    });
});

// Listar todos os chamados
app.get("/chamados", (req: Request, res: Response) => {
    res.json(chamados);
});

// Buscar chamado por ID
app.get("/chamados/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const chamado = chamados.find(item => item.id === id);

    if (!chamado) {
        return res.status(404).json({
            erro: "Chamado não encontrado"
        });
    }

    res.json(chamado);
});

// Criar chamado
app.post("/chamados", (req: Request, res: Response) => {
    const { titulo, descricao, categoria, prioridade } = req.body;

    if (!titulo || !descricao || !categoria || !prioridade) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    const novoChamado: Chamado = {
        id: proximoId++,
        titulo,
        descricao,
        categoria,
        prioridade,
        status: "ABERTO"
    };

    chamados.push(novoChamado);

    res.status(201).json(novoChamado);
});

// Atualizar status do chamado
app.patch("/chamados/:id/status", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    const chamado = chamados.find(item => item.id === id);

    if (!chamado) {
        return res.status(404).json({
            erro: "Chamado não encontrado"
        });
    }

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

    chamado.status = status;

    res.json(chamado);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
