'use client'

import { useState } from "react"
import { Salvar } from "../actions";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

export default function Novo() {
    const [busy, setBusy] = useState(false);
    const [dados, setDados] = useState({ titulo: '', dataPublicacao: '' });

    const handleChange = (e) => {
        setDados(dados => ({ ...dados, [e.target.name]: e.target.value }));
    }

    const handleSalvar = async (f) => {
        f.preventDefault();
        setBusy(true);

        try {
            await Salvar(dados);
        } catch {
            Swal.fire({
                text: "Erro ao salvar o livro",
                icon: 'error',
                timer: 3000,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });
        }

        setBusy(p => false);
        redirect('/livros');
    }

    return (
        <div className="mt-2 ml-2">
            <form onSubmit={handleSalvar} className="flex flex-row">
                <label>
                    Título
                    <input type="text" required className="bg-neutral-50 border mx-2 px-2 py-2" value={dados.titulo} name="titulo" onChange={handleChange} />
                </label>
                <label>
                    Data de Publicação
                    <input type="datetime-local" required className="bg-neutral-50 border ml-2 px-2 py-2" value={dados.dataPublicacao} name="dataPublicacao" onChange={handleChange} />
                </label>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200 ml-2" disabled={busy}>
                    {busy ? " ...... " : "Salvar"}
                </button>
            </form>
        </div>
    )
}
