'use client'

import { useContext } from "react";
import { DadosContext } from "../context";
import { mapasMapped } from "@/utils";

export default function Sessao3() {
    const dados = useContext(DadosContext);

    function handleDiminuir() {
        if (dados.setup.mapa > 0)
            dados.alterar("mapa", dados.setup.mapa - 1);
        else
            dados.alterar("mapa", 3);
    }

    function handleAumentar() {
        if (dados.setup.mapa < 3)
            dados.alterar("mapa", dados.setup.mapa + 1);
        else
            dados.alterar("mapa", 0);
    }

    let valor = Object.entries(mapasMapped).find(([key, val]) => val === dados.setup.mapa)[0];

    return (
        <>
            <p className="font-bold">Motor</p>
            <p>Mapa atual: {valor}</p>
            <div>
                <button onClick={handleDiminuir} className="text-white px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-700 disabled:bg-yellow-200">-</button>
                <button onClick={handleAumentar} className="text-white px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-700 disabled:bg-emerald-200">+</button>
            </div>
        </>
    );
}