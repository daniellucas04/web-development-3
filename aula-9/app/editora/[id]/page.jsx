'use client'

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { Atualizar, Obter } from "../actions";

export default function Editar({ params }) {

    const [busy, setBusy] = useState(false);
    const [dados, setDados] = useState({ titulo: '', sigla: '', cidade: '' });

    const handleChange = (e) => {
        setDados(dados => ({ ...dados, [e.target.name]: e.target.value }));
    }

    const router = useRouter();

    const handleSalvar = async (f) => {
        f.preventDefault();
        setBusy(true);

        try {
            const resultado = await Atualizar(dados);
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

    const { id } = use(params);

    const handleCarregar = async () => {

        if (id) {
            setBusy(true);
            const resultado = await Obter(parseInt(id));
            setBusy(p => false);

            if (resultado === null) {
                router.replace("/editora");
            }
            else {
                setDados(resultado);
            }

        }
        else {
            router.replace("/editora");
        }

    }

    useEffect(() => {
        handleCarregar();
    }, []);

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
