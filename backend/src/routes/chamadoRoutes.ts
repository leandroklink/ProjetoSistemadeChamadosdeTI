import { Router } from "express";
import { chamadoController } from "../controllers/chamadoController";

const router = Router();

router.get("/", (req, res) => chamadoController.listar(req, res));

router.get("/:id", (req, res) => chamadoController.buscarPorId(req, res));

router.post("/", (req, res) => chamadoController.criar(req, res));

router.patch("/:id/status", (req, res) => chamadoController.atualizarStatus(req, res));

export default router;


//Defininfo os endereços da API.