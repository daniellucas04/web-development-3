'use client'

import { useState } from "react";
import Sessao1 from "./components/Sessao1";
import Sessao2 from "./components/Sessao2";
import Sessao3 from "./components/Sessao3";
import { DadosContext } from "./context";
import { mapasMapped } from "@/utils";

export default function Home() {
  const [sessaoAtual, setSessaoAtual] = useState(null);
  const [setup, setSetup] = useState({
    AD: 10, // Asa dianteira
    AT: 12, // Asa traseira
    DE: 30, // Dianteiro esquerdo
    DD: 30, // Dianteiro direito
    TE: 30, // Traseiro esquerdo
    TD: 30, // Traseiro direito
    mapa: 0
  });

  function handleAlterarSetup(attr, valor) {
    setSetup(p => ({...p, [attr]: valor}));
  }

  let mapa = Object.entries(mapasMapped).find(([key, val]) => val === setup.mapa)[0];

  return (
    <>
      <p>Simulador de carros</p>

      <button onClick={() => {setSessaoAtual(1)}} className={`${sessaoAtual == 1 ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-200 hover:bg-gray-50'} border border-zinc-300 px-4 py-2 transition-colors`}>Seção 1</button>
      <button onClick={() => {setSessaoAtual(2)}} className={`${sessaoAtual == 2 ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-200 hover:bg-gray-50'} border border-zinc-300 px-4 py-2 transition-colors`}>Seção 2</button>
      <button onClick={() => {setSessaoAtual(3)}} className={`${sessaoAtual == 3 ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-gray-200 hover:bg-gray-50'} border border-zinc-300 px-4 py-2 transition-colors`}>Seção 3</button>
      <button onClick={() => {setSessaoAtual(4)}} className="bg-blue-500 text-white hover:bg-blue-400 border border-zinc-300 px-4 py-2 transition-colors">Salvar</button>

      <DadosContext.Provider value={{ setup, alterar: handleAlterarSetup }}>
        {sessaoAtual == 1 && <Sessao1 />}
        {sessaoAtual == 2 && <Sessao2 />}
        {sessaoAtual == 3 && <Sessao3 />}
        {sessaoAtual == 4 && (
          <div className="mt-4 font-semibold">
            <h1 className="text-3xl font-normal">Resumo:</h1>
            <p>Mapa: {mapa}</p>
            <p>Asa Dianteira: {setup.AD}</p>
            <p>Asa Traseira: {setup.AT}</p>
            <p>Dianteiro Esquerdo: {setup.DE.toFixed(1)}</p>
            <p>Dianteiro Direito: {setup.DD.toFixed(1)}</p>
            <p>Traseiro Esquerdo: {setup.TE.toFixed(1)}</p>
            <p>Traseiro Direito: {setup.TD.toFixed(1)}</p>
          </div>
        )}
      </DadosContext.Provider>
    </>
  )
}