'use client'

import { useContext, useState } from "react";
import { DadosContext } from "../context";

export default function Sessao2() {
    const dados = useContext(DadosContext);

    const [incremento, setIncremento] = useState(0.1);

    function handleDiminuirPressao(pneu) {
        dados.alterar(pneu, dados.setup[pneu] - incremento)
    }

    function handleAumentarPressao(pneu) {
        dados.alterar(pneu, dados.setup[pneu] + incremento)
    }
    
    function handleDiminuirIncremento() {
        setIncremento(p => p - 0.1);
    }

    function handleAumentarIncremento() {
        setIncremento(p => p + 0.1);
    }

    return (
        <>
            <p className="font-bold">Mecânica</p>
            <div>
                <p>Incremento: {incremento.toFixed(1)}</p>
                <div className="flex gap-2">
                    <button onClick={handleDiminuirIncremento} disabled={incremento === 0.1} className="text-white px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-700 disabled:bg-yellow-200">-</button>
                    <button onClick={handleAumentarIncremento} disabled={incremento === 2.0} className="text-white px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-700 disabled:bg-emerald-200">+</button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        Dianteiro Esquerdo: {dados.setup.DE.toFixed(1)}
                        {(dados.setup.DE < 20 || dados.setup.DE > 40) && <span className="text-gray-500">Pneu fora do intervalo permitido</span>}
                        <div className="flex gap-2">
                            <button onClick={() => {handleDiminuirPressao("DE")}} className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-700 disabled:bg-red-200">-</button>
                            <button onClick={() => {handleAumentarPressao('DE')}} className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-700 disabled:bg-blue-200">+</button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        Dianteiro Direito: {dados.setup.DD.toFixed(1)}
                        {(dados.setup.DD < 20 || dados.setup.DD > 40) && <span className="text-gray-500">Pneu fora do intervalo permitido</span>}
                        <div className="flex gap-2">
                            <button onClick={() => {handleDiminuirPressao("DD")}} className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-700 disabled:bg-red-200">-</button>
                            <button onClick={() => {handleAumentarPressao('DD')}} className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-700 disabled:bg-blue-200">+</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col">
                        Traseiro Esquerdo: {dados.setup.TE.toFixed(1)}
                        {(dados.setup.TE < 20 || dados.setup.TE > 40) && <span className="text-gray-500">Pneu fora do intervalo permitido</span>}
                        <div className="flex gap-2">
                            <button onClick={() => {handleDiminuirPressao("TE")}} className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-700 disabled:bg-red-200">-</button>
                            <button onClick={() => {handleAumentarPressao('TE')}} className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-700 disabled:bg-blue-200">+</button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        Traseiro Direito: {dados.setup.TD.toFixed(1)}
                        {(dados.setup.TD < 20 || dados.setup.TD > 40) && <span className="text-gray-500">Pneu fora do intervalo permitido</span>}
                        <div className="flex gap-2">
                            <button onClick={() => {handleDiminuirPressao('TD')}} className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-400 active:bg-red-700 disabled:bg-red-200">-</button>
                            <button onClick={() => {handleAumentarPressao('TD')}} className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 active:bg-blue-700 disabled:bg-blue-200">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}