'use client'

import { useEffect, useState } from "react"
import { Obter } from "./api/actions";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [atualizar, setAtualizar] = useState(true);

  const Carregar = async () => {
    const data = await Obter();
    setDados(data);
    setAtualizar(false);
  }

  useEffect(() => {
    if (atualizar) {
      Carregar();
    }
  }, [atualizar]);

  return (
    <>
      <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white" onClick={() => { setAtualizar(true) }}>Atualizar</button>
      <p>Docentes</p>
      {
        dados.map((p) => (
          <div key={p.id}>
            <p>Nome: {p.nome}</p>
            <p>E-mail: {p.email}</p>
          </div>
        ))
      }
    </>
  )
}
