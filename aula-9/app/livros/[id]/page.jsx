'use client'

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { Atualizar, Obter } from "../actions";
import { Listar } from "@/app/editora/actions";

export default function Editar({ params }) {
    const [busy, setBusy] = useState(false);
    const [dados, setDados] = useState({ titulo: '', dataPublicacao: '', id_editora: '' });
    const [editoras, setEditoras] = useState([])
    const router = useRouter();

    const handleChange = (e) => {
        setDados(dados => ({ ...dados, [e.target.name]: e.target.value }));
    }

    const handleSalvar = async (f) => {
        f.preventDefault();
        setBusy(true);

        try {
            const resultado = await Atualizar(dados);
            if (resultado) {
                router.push("/livros?sucesso=1");
            }
        }
        catch {
            Swal.fire({
                text: "Erro ao buscar os dados",
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
            
            setEditoras(await Listar())
            const resultado = await Obter(parseInt(id));

            if (resultado.id_editora == null)
                resultado.id_editora = ''

            setBusy(p => false);

            if (resultado === null) {
                router.replace("/livros");
            }
            else {
                setDados(resultado);
            }
        }
        else {
            router.replace("/livros");
        }
    }

    useEffect(() => {
        handleCarregar();
    }, []);

    

    return (
        <div className="mt-2 ml-2">
            <form onSubmit={handleSalvar} className=" flex flex-row">
                <label>
                    Título
                    <input type="text" required className="bg-neutral-50 border mx-2 px-2 py-2" value={dados.titulo} name="titulo" onChange={handleChange} />
                </label>
                <label>
                    Ano de Publicação
                    <input type="datetime-local" min={1500} max={2025} required className="bg-neutral-50 border ml-2 px-2 py-2" value={dados.dataPublicacao} name="dataPublicacao" onChange={handleChange} />
                </label>
                <label>
                    Editora
                    <select value={dados.id_editora} name="id_editora" onChange={handleChange}>

                        <option key={0} value=''>[Nenhuma]</option>
                        {
                            editoras?.map(p => (
                                <option key={p.id} value={p.id}>{p.titulo}</option>
                            ))
                        }
                    </select>
                </label>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200 ml-2" disabled={busy}>
                    {busy ? " ...... " : "Salvar"}
                </button>
            </form>
        </div>
    )
}
