export interface Chamado {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    prioridade: string;
    status: "ABERTO" | "EM ATENDIMENTO" | "RESOLVIDO";
}


//definindo o formado que um chamado deve ter,
//para que o typescript saiba como ele deve ser estruturado.