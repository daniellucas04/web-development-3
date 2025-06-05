'use server'

import { signIn } from "@/auth";
import { PrismaClient } from "@/generated/prisma"
import { isRedirectError } from "next/dist/client/components/redirect-error";

const prisma = new PrismaClient();

const crypto = require('crypto');

function createSHA256Hash(inputString) {
    const hash = crypto.createHash('sha256');
    hash.update(inputString);
    return hash.digest('hex');
}

export async function Salvar({ nome, email, senha }) {
    console.log(createSHA256Hash(senha))
    const user = prisma.usuario.create({
        data: { nome, email, senha: createSHA256Hash(senha) }
    });

    return user;
}

export async function Autenticar({ email, senha }) {
    console.log(createSHA256Hash(senha))
    const user = prisma.usuario.findFirst({
        where: {
            email: email,
            senha: createSHA256Hash(senha)
        },
        omit: {
            senha
        }
    });

    return user;
}

export async function Entrar({ email, senha }) {
    try {
        await signIn('credentials', { email, senha });
    }
    catch (error) {
        if (isRedirectError(error))
            throw error;
        return "Email e/ou senha inválido(s)";
    }}
