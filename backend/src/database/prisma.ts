import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Conexão única com o banco, reutilizada em todo o projeto.