"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Exercio() {
    const {register, handleSubmit} = useForm();

    const [dados, setDados] = useState({
        nome: '',
        email: '',
        nota: 0.0,
    });
    const [erros, setErros] = useState({
        nome: null,
        email: null,
        nota: null,
    });

    function handleDados(event) {
        setDados(dados => ({...dados, [event.target.name]: event.target.value}));
    }

    function validarDados() {
        if (dados.nome == '') {
            setErros(erros => ({...erros, nome: 'O nome não pode ser vazio'}))
            return false;
        }

        if (dados.nome.length > 100) {
            setErros(erros => ({...erros, nome: 'O nome não deve ter mais de 100 caracteres'}))
            return false;
        }

        if (dados.email == '') {
            setErros(erros => ({...erros, email: 'O email não pode ser vazio'}))
            return false;
        }

        if (dados.email.length > 100) {
            setErros(erros => ({...erros, email: 'O email não deve ter mais de 100 caracteres'}))
            return false;
        }

        if (dados.nota == '') {
            setErros(erros => ({...erros, nota: 'A nota não pode ser vazia'}))
            return false;
        }

        if (dados.nota > 10 || dados.nota < 0) {
            setErros(erros => ({...erros, nota: 'A nota não deve ter mais de 100 caracteres'}))
            return false;
        }

        setErros({
            nome: null,
            email: null,
            nota: null,
        });
        return true;
    }

    function submit(data) {
        console.log(data);
    }

    return (
        <section className="border border-gray-200  p-8 rounded-xl m-50">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex flex-col w-full gap-2">
                        <input {...register("nome", {required: true, maxLength: 100})} className="flex-auto border border-gray-300 py-2 px-4 rounded-lg" type="text" placeholder="Nome" />
                        <span className="text-red-500">{erros.nome}</span>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <input {...register("email", {required: true, maxLength: 100})} className="flex-auto border border-gray-300 py-2 px-4 rounded-lg" type="email" placeholder="E-mail" />
                        <span className="text-red-500">{erros.email}</span>
                    </div>
                
                    <div className="flex flex-col w-full gap-2">
                        <input {...register("nota", {required: true, min: 0, max: 10})} className="flex-auto border border-gray-300 py-2 px-4 rounded-lg" type="number" placeholder="Nota" />
                        <span className="text-red-500">{erros.nota}</span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 cursor-pointer">Enviar</button>
                </div>
            </form>
        </section>
    );
}