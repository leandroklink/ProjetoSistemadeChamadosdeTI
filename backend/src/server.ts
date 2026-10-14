import express from "express";
import cors from "cors";

import chamadoRoutes from "./routes/chamadoRoutes";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API HelpDesk funcionando!"
    });
});

// Rotas de chamados
app.use("/chamados", chamadoRoutes);

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});