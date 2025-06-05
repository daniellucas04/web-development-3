'use client'
import { useState } from "react";
import { createContact } from "../actions";
import Swal from "sweetalert2";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastrarContato() {
    const [data, setData] = useState({
        name: '',
        email: '',
        operator: '',
        phone: '',
    });
    const router = useRouter();

    function handleChange(event) {
        setData(p => ({...p, [event.target.name]: event.target.value}));
    }

    function clearInputs() {
        setData({
            name: '',
            email: '',
            operator: '',
            phone: '',
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let person = {
            name: data.name,
            email: data.email
        };

        let phone = {
            operator: data.operator,
            phone: data.phone
        };
        try {
            await createContact(person, phone);

            await Swal.fire({
                text: "Contato salvo com sucesso!",
                icon: 'success',
                timer: 3000,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });

            router.replace('/');
        } catch (error) {
            Swal.fire({
                text: error,
                icon: 'error',
                timer: 3000,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });
        }
    }

    return (
        <section className="m-12 border border-zinc-400 rounded-md p-8">
            <Link href={`/`} className="border border-zinc-300 rounded py-2 px-4 hover:bg-zinc-100">Voltar</Link>
            <h1 className="text-lg font-bold text-zinc-600 my-4">Cadastrar novo contato</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label className="text-zinc-500" htmlFor="name">Nome *</label>
                    <input onChange={handleChange} value={data.name} className="flex-auto border border-zinc-300 rounded py-1 px-1" type="text" id="name" name="name" required />
                </div>
                <div className="flex flex-col">
                    <label className="text-zinc-500" htmlFor="email">E-mail *</label>
                    <input onChange={handleChange} value={data.email} className="flex-auto border border-zinc-300 rounded py-1 px-1" type="email" id="email" name="email" required />
                </div>
                <div className="flex flex-col">
                    <label className="text-zinc-500" htmlFor="operator">Operadora *</label>
                    <input onChange={handleChange} value={data.operator} className="flex-auto border border-zinc-300 rounded py-1 px-1" type="text" id="operator" name="operator" required />
                </div>
                <div className="flex flex-col">
                    <label className="text-zinc-500" htmlFor="phone">Telefone *</label>
                    <input onChange={handleChange} value={data.phone} className="flex-auto border border-zinc-300 rounded py-1 px-1" type="text" id="phone" name="phone" required />
                </div>
                <div className="flex justify-end">
                    <button className="bg-emerald-500 text-white border border-emerald-400 rounded py-2 px-4 hover:bg-emerald-600 hover:text-zinc-100 cursor-pointer">Salvar</button>
                </div>
            </form>
        </section>
    );
}