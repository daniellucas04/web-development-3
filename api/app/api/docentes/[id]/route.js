import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id } = await params;
    const idPesquisa = Number(id)

    if (isNaN(idPesquisa))
        return new NextResponse("Docente não existe", { status: 404 })

    try {

        const result = await prisma.docente.findUnique({
            where: {
                id: idPesquisa
            }
        });

        return NextResponse.json(result);
    } catch {
        return new NextResponse("Falha geral", { status: 400 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const idUpdate = Number(id);
        const data = await request.json();

        if (idUpdate != data.id)
            return new NextResponse("Dados inválidos", { status: 400 });

        let exist = await prisma.docente.findUnique({
            where: {
                id: idUpdate
            }
        });

        if (!exist) 
            return new NextResponse("Docente não existe", { status: 400 });
        
        exist = await prisma.docente.findUnique({
            where: {
                email: data.email
            }
        });
        
        if (exist !== null && exist.id !== data.id) 
            return new NextResponse("E-mail já em uso por outro docente", { status: 400 });
        
        const result = await prisma.docente.update({
            data: {...data, id: undefined},
            where: {
                id: idUpdate
            }
        });

        return NextResponse.json(result);
    } catch {
        return new NextResponse("Falha geral", { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const idDelete = Number(id);

        if (isNaN(idDelete))
            return new NextResponse("Dados inválidos", { status: 400 });

        let exist = await prisma.docente.findUnique({
            where: {
                id: idDelete
            }
        });
        
        if (!exist)
            return new NextResponse("Docente não existe", { status: 400 });

        const result = await prisma.docente.delete({
            where: {
                id: idDelete
            }
        });

        return new NextResponse("Docente removido");
    } catch (e) {
        console.log(e);
        return new NextResponse("Falha geral", { status: 400 });
    }
}