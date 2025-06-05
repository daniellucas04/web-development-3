'use client';

import { use, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Listar, Remover } from "./actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Editoras({ searchParams }) {

    const [busy, setBusy] = useState(false);
    const [dados, setDados] = useState([]);
    const [atualizar, setAtualizar] = useState(true);

    const handleAtualizar = async () => {
        setBusy(true);

        try {
            const resultado = await Listar();
            setDados(resultado);
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

        setAtualizar(false);
        setBusy(false);
    }

    const handleRemover = async (id) => {
        const resposta = confirm('Deseja realmente remover este editora?');
        if (resposta) {
            setBusy(true);
            const resultado = await Remover(id);
            if (resultado) {
                setAtualizar(true);
                Swal.fire({
                    text: "Editora removida com sucesso",
                    icon: 'success',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                })
            }
            else {
                Swal.fire({
                    text: "Erro ao remover a editora informada",
                    icon: 'error',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                })
            }
            setBusy(p => false);
        }
    }

    const searchParamsValue = use(searchParams);
    const router = useRouter();

    useEffect(() => {
        if (atualizar) {
            handleAtualizar();

            if (searchParamsValue?.sucesso === "1") {
                Swal.fire({
                    text: "Editora salva com sucesso",
                    icon: 'success',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                })
                router.replace("/editora");
            }
        }
    }, [atualizar]);

    return (
        <>

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200" disabled={busy} onClick={() => { setAtualizar(true) }}>
                {busy ? " ...... " : "Atualizar"}
            </button>

            <Link className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200" href={"/editora/novo"}>Nova</Link>

            <table>
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td className="px-4">Sigla</td>
                        <td>Cidade</td>
                        <td className="px-4">Editar</td>
                        <td>Remover</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((p) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.titulo}</td>
                                    <td className="px-4">{p.sigla}</td>
                                    <td>{p.cidade}</td>
                                    <td><Link href={`/editora/${p.id}`} className="text-blue-600 px-4">Editar</Link></td>
                                    <td><span className="text-red-600 cursor-pointer" onClick={() => { handleRemover(p.id) }}>Remover</span></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}
