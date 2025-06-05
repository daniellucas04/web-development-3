'use client'

import { useContext, useState } from "react";
import { DadosContext } from "../context";

export default function Sessao1() {
    const dados = useContext(DadosContext);

    function handleAumentarAsaDianteira() {
        if (dados.setup.AD < 20)
            dados.alterar('AD', dados.setup.AD + 1);
    }

    function handleDiminuirAsaDianteira() {
        if (dados.setup.AD > 0)
            dados.alterar('AD', dados.setup.AD - 1);
    }

    function handleAumentarAsaTraseira() {
        dados.alterar('AT', dados.setup.AT - 1);
    }

    function handleDiminuirAsaTraseira() {
        dados.alterar('AT', dados.setup.AT + 1);
    }

    return (
        <>
            <p className="font-bold">Aerodinâmica</p>
            <div>
                Asa Dianteira: {dados.setup.AD}
                <div className="flex gap-2">
                    <button onClick={handleDiminuirAsaDianteira} disabled={dados.setup.AD === 0} className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-700 disabled:bg-red-200">-</button>
                    <button onClick={handleAumentarAsaDianteira} disabled={dados.setup.AD === 20} className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-700 disabled:bg-blue-200">+</button>
                </div>
            </div>
            <div>
                Asa Traseira: {dados.setup.AT}
                <div className="flex gap-2">
                    <button onClick={handleDiminuirAsaTraseira} disabled={dados.setup.AT === 0} className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-700 disabled:bg-red-200">-</button>
                    <button onClick={handleAumentarAsaTraseira} disabled={dados.setup.AT === 20} className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-700 disabled:bg-blue-200">+</button>
                </div>
            </div>
        </>
    );
}