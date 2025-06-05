'use server'

import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient();

export async function Listar() {
    const livros = await prisma.livro.findMany();

    return livros;
}

export async function Salvar(livro) {
    livro.dataPublicacao = new Date(livro.dataPublicacao);

    if (livro.id_editora === '')
        livro.id_editora = null
    else
        livro.id_editora = parseInt(livro.id_editora)

    const retorno = prisma.livro.create({
        data: livro
    });

    return retorno;
}

export async function Obter(id) {

    const resultado = await prisma.livro.findUnique({
        where: {
            id: id
        }
    })

    return resultado;
}

export async function Atualizar(livro) {
    livro.dataPublicacao = new Date(livro.dataPublicacao);

    if (livro.id_editora === '')
        livro.id_editora = null
    else
        livro.id_editora = parseInt(livro.id_editora)


    const resultado = prisma.livro.update({
        where: {
            id: livro.id
        },
        data: { ...livro, id: undefined }
    });

    return resultado;
}

export async function Remover(id) {
    const resultado = prisma.livro.delete({
        where: {
            id: id
        }
    });
    return resultado;
}

export async function PesquisarPorTitulo({ tituloAPesquisar }) {
    console.log(tituloAPesquisar)
    const resultado = await prisma.livro.findMany({
        where:{
            titulo: {
                contains: tituloAPesquisar
            }
        }
    })

    return resultado;
}

export async function PesquisarPorAno({ data }) {
    data = (data != '') && new Date(data);

    const resultado = await prisma.livro.findMany({
        where: {
            ...(data != '') && {
                dataPublicacao: data
            }
        }
    })

    return resultado;
}

export async function Pesquisar({ titulo, ano }) {
    const livros = await prisma.livro.findMany({
        where: {
            OR: [
                {
                    titulo: {
                        contains: titulo
                    },
                },
                {
                    ...(!isNaN(Number(ano)) && {
                        anoPublicacao: ano
                    })
                }
            ]
        },
        orderBy: {
            dataPublicacao: 'desc'
        },
        include: {
            editora: true
        }
    });

    return livros;
}
