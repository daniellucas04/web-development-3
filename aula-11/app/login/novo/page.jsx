'use client'

import { useState } from "react";
import { Salvar } from "../actions";
import { useRouter } from "next/navigation";

export default function NovoUsuario() {
    const router = useRouter();
    const [user, setUser] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    function handleChange(event) {
        setUser(user => ({ ...user, [event.target.name]: event.target.value }))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const resultado = await Salvar(user);

        if (resultado && resultado.id) {
            console.log('Usuário salvo com sucesso');
            router.push('/login');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} method="post" className="space-y-4 m-8">
                <div className="flex flex-col">
                    <label htmlFor="nome">Nome</label>
                    <input className="border rounded py-2 px-1 bg-zinc-900" onChange={handleChange} type="text" name="nome" id="nome" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">E-mail</label>
                    <input className="border rounded py-2 px-1 bg-zinc-900" onChange={handleChange} type="email" name="email" id="email" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Senha</label>
                    <input className="border rounded py-2 px-1 bg-zinc-900" onChange={handleChange} type="password" name="password" id="password" />
                </div>
                <div className="flex">
                    <button className="bg-blue-500 rounded flex-1 py-2 px-4 hover:bg-blue-600 cursor-pointer transition-all">Login</button>
                </div>
            </form>
        </>
    )
}