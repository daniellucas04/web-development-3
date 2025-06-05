'use server'

import { PrismaClient } from "@/generated/prisma"

export async function Listar() {
    const prisma = new PrismaClient();
    const livros = await prisma.livro.findMany();

    return livros;
}

export async function Salvar(livro) {
    const prisma = new PrismaClient();
    
    livro.dataPublicacao = new Date(livro.dataPublicacao).toLocaleDateString('en-US', {timezone: 'America/Sao_Paulo'});
    livro.dataPublicacao = new Date(livro.dataPublicacao);

    const retorno = prisma.livro.create({
        data: livro
    });

    return retorno;
}

export async function Obter(id) {
    const prisma = new PrismaClient();

    const resultado = await prisma.livro.findUnique({
        where: {
            id: id
        }
    })

    return resultado;
}

export async function Atualizar(livro) {
    livro.dataPublicacao = new Date(livro.dataPublicacao).toLocaleDateString('en-US', {timezone: 'America/Sao_Paulo'});
    livro.dataPublicacao = new Date(livro.dataPublicacao);

    const prisma = new PrismaClient();

    const resultado = prisma.livro.update({
        where: {
            id: livro.id
        },
        data: { ...livro, id: undefined }
    });

    return resultado;
}

export async function Remover(id) {
    const prisma = new PrismaClient();
    const resultado = prisma.livro.delete({
        where: {
            id: id
        }
    });
    return resultado;
}
