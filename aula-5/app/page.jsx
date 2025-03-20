"use client"

import { useEffect, useState } from "react";

export default function Home() {
  // const [nome, setNome] = useState('');
  // const [email, setEmail] = useState('');
  // const [quantidadeMaterias, setQuantidadeMaterias] = useState('');
  // const [area, setArea] = useState('');
  // const [contrato, setContrato] = useState(20);
  // const [autoriza, setAutoriza] = useState(false);

  const [dados, setDados] = useState({
    nome: '',
    email: '',
    quantidadeMateria: 0,
    area: '',
    contrato: 20,
    autoriza: false
  });

  function handleDados(event) {
    let value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;
    setDados(dados => ({...dados, [event.target.name]: value})); 
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(dados);
  }

  return (
    <section className="border border-gray-200  p-8 rounded-xl m-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input className="flex-auto border border-gray-300 py-2 px-4 rounded-lg" value={dados.nome} onChange={handleDados} name="nome"  type="text" placeholder="Nome" />
          <input className="flex-auto border border-gray-300 py-2 px-4 rounded-lg" value={dados.email} onChange={handleDados} name="email" type="email" placeholder="E-mail" />
        </div>

        <div className="flex">
          <input className="flex-1 border border-gray-300 py-2 px-4 rounded-lg" value={dados.quantidadeMateria} onChange={handleDados} name="quantidadeMateria" type="number" min={0} placeholder="Quantidade de matérias" />
        </div>

        <div className="flex flex-col">
          <label>Área do docente</label>
          <select value={dados.area} onChange={handleDados} name="area" className="flex-1 border border-gray-300 py-2 px-4 rounded-lg">
            <option value="biologia" key={1}>Biologia</option>
            <option value="fisica" key={2}>Física</option>
            <option value="informatica" key={3}>Informática</option>
            <option value="letras" key={4}>Letras</option>
            <option value="matematica" key={5}>Matemática</option>
            <option value="quimica" key={6}>Química</option>
            <option value="sociologia" key={7}>Sociologia</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Tipo de contrato</label>
          <div className="flex items-center gap-2">
            <input value={20} onChange={handleDados} checked={dados.contrato === 20} name="contrato" type="radio" />
            <label>20 horas</label>
          </div>

          <div className="flex items-center gap-2">
            <input value={40} onChange={handleDados} checked={dados.contrato === 40} name="contrato" type="radio" />
            <label>40 horas</label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input onChange={handleDados} name="autoriza" type="checkbox" />
          <label>Autorizo o envio de e-mails</label>
        </div>

        <div className="flex justify-end">
          <button className="border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 cursor-pointer">Enviar</button>
        </div>
      </form>
    </section>
  );
}
