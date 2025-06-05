'use client'

import Link from "next/link";
import { useState } from "react";
import { Entrar } from "./actions";

export default function Login() {

    const [login, setLogin] = useState({
        email: '',
        senha: ''
    });

    const handleChange = (event) => {
        setLogin(login => ({ ...login, [event.target.name]: event.target.value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const resultado = await Entrar(login);
        console.log(resultado)
    }

    return (
        <>
            <div className="p-4">
                <Link href="/login/novo" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded">Cadastrar novo usuário</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 p-4 items-start text-black">
                    <label>
                        <span className="mr-2 text-white">E-mail</span>
                        <input type="email" name="email" value={login.email} onChange={handleChange} required className="bg-gray-200 p-2" />
                    </label>
                    <label>
                        <span className="mr-2 text-white">Senha</span>
                        <input type="password" name="senha" value={login.senha} onChange={handleChange} required className="bg-gray-200 p-2" />
                    </label>
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded">
                        Entrar
                    </button>
                </div>
            </form>
        </>
    )
}
