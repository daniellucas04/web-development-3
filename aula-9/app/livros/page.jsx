'use client';

import { use, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Listar, Pesquisar, PesquisarPorAno, PesquisarPorTitulo, Remover } from "./actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Livros({ searchParams }) {

    const [busy, setBusy] = useState(false);
    const [dados, setDados] = useState([]);
    const [atualizar, setAtualizar] = useState(true);
    const [pesquisa, setPesquisa] = useState({
        titulo: '',
        dataPublicacao: '',
    });

    const handleAtualizar = async () => {
        setBusy(true);

        try {
            // const livros = await Listar();
            // const livros = await PesquisarPorTitulo({ tituloAPesquisar: pesquisa.titulo });
            // const livros = await PesquisarPorAno({ data: pesquisa.dataPublicacao });
            const livros = await Pesquisar({ titulo: pesquisa.titulo, data: pesquisa.dataPublicacao })
            setDados(livros);
        }
        catch (error){
            console.log(error);
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
        const resposta = confirm('Deseja realmente remover este livro?');
        if (resposta) {
            setBusy(true);
            const resultado = await Remover(id);
            if (resultado) {
                setAtualizar(true);
                Swal.fire({
                    text: "Livro removido com sucesso",
                    icon: 'success',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                })
            }
            else {
                Swal.fire({
                    text: "Erro ao remover o livro informado",
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
                    text: "Livro salvo com sucesso",
                    icon: 'success',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                })
                router.replace("/livros");
            }
        }
    }, [atualizar]);

    return (
        <>
            <p>Livros disponíveis</p>

            <div className="my-8">
                <label>
                    Título
                    <input type="text" className="bg-gray-100" value={pesquisa.titulo} onChange={(e) => setPesquisa(p => ({ ...pesquisa, titulo: e.target.value }))} />
                </label>

                <label>
                    Ano
                    <input type="date" className="bg-gray-100" value={pesquisa.dataPublicacao} onChange={(e) => setPesquisa(p => ({ ...pesquisa, dataPublicacao: e.target.value }))} />
                </label>

            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200" disabled={busy} onClick={() => { setAtualizar(true) }}>
                {busy ? " ...... " : "Atualizar"}
            </button>

            <Link className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-200" href={"/livros/novo"}>Novo</Link>

            <table className="border m-4">
                <thead>
                    <tr>
                        <td className="px-4 text-center">Título</td>
                        <td className="px-4 text-center">Ano de Publicação</td>
                        <td className="px-4 text-center">Editora</td>
                        <td className="px-4 text-center">Editar</td>
                        <td className="px-4 text-center">Remover</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((p) => {
                            return (
                                <tr key={p.id}>
                                    <td className="px-4 border">{p.titulo}</td>
                                    <td className="px-4 border">{new Date(p.dataPublicacao).toLocaleDateString()}</td>
                                    <td className="px-4 border">{p.editora?.titulo}</td>
                                    <td className="px-4 border"><Link href={`/livros/${p.id}`} className="text-blue-600 pl-2">Editar</Link></td>
                                    <td className="px-4 border"><a href="#" className="text-red-600 pl-2" onClick={() => { handleRemover(p.id) }}>Remover</a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

