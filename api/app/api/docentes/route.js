import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        return NextResponse.json(await prisma.docente.findMany());
    } catch {
        return new NextResponse("Falha geral", { status: 400 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        
        const existe = await prisma.docente.findUnique({
            where: {
                email: data.email
            }
        })
    
        if (existe) {
            return new NextResponse("E-mail já existe", { status: 400 });
        }
    
        const result = await prisma.docente.create({
            data,
        })
    
        return NextResponse.json(result);
    } catch {
        return new NextResponse("Falha geral", { status: 400 });
    }
}