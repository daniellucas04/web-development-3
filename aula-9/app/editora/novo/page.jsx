'use client'

import { useState } from "react"

import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { Salvar } from "../actions";

export default function Novo() {

    const router = useRouter();

    const [busy, setBusy] = useState(false);
    const [dados, setDados] = useState({ titulo: '', sigla: '', cidade: '' });

    const handleChange = (e) => {
        setDados(dados => ({ ...dados, [e.target.name]: e.target.value }));
    }

    const handleSalvar = async (f) => {
        f.preventDefault();
        setBusy(true);

        try {
            const resultado = await Salvar(dados);
            if (resultado) {
                router.push("/editora?sucesso=1");
            }
        }
        catch {
            Swal.fire({
                text: "Erro ao salvar a editora informada",
                icon: 'error',
                timer: 3000,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            })
        }

        setBusy(p => false);
    }

    return (
        <div className="mt-2 ml-2">
            <form onSubmit={handleSalvar} className=" flex flex-row">
                <div className="flex flex-col space-y-1 text-right">
                    <label>
                        Título
                        <input type="text" maxLength={100} required className="bg-neutral-50 border mx-2 px-2 py-2" value={dados.titulo} name="titulo" onChange={handleChange} />
                    </label>
                    <label>
                        Sigla
                        <input type="text" required className="bg-neutral-50 border mx-2 px-2 py-2" value={dados.sigla} name="sigla" onChange={handleChange} />
                    </label>
                    <label>
                        Cidade
                        <input type="text" className="bg-neutral-50 border mx-2 px-2 py-2" value={dados.cidade} name="cidade" onChange={handleChange} />
                    </label>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200 ml-2" disabled={busy}>
                        {busy ? " ...... " : "Salvar"}
                    </button>
                </div>
            </form>
        </div>
    )
}
