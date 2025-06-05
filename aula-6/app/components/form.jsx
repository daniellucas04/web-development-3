'use client'

import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";

const TAXA_ETANOL = 2.5/100;
const TAXA_GERAL = 4/100;

export default function Form() {
    const [message, setMessage] = useState([]);
    const [ipva, setIpva] = useState('');
    const [data, setData] = useState({
        valor: 0,
        ano: new Date().getFullYear().toString(),
        motorizacao: '',
    })

    function handleData(event) {
        setData(data => ({...data, [event.target.name]: event.target.value}));
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        let error = [];

        //obrigatoriedade
        if (data.valor == '' || data.valor == 0)
            error.push('O campo Valor é obrigatório.');
        if (data.ano == '')
            error.push('O campo Ano de fabricação é obrigatório.');
        if (data.motorizacao == '')
            error.push('O campo Motorização é obrigatório.');

        //validação
        if (data.ano.length != 4)
            error.push('O campo Ano de fabricação está inválido.');

        if (error.toString() != '') {
            setMessage(error);
            return;
        }
        
        setMessage([]);
        calculaIpva();
    }

    function handleClear() {
        setMessage([]);
        setData({valor: '', ano: '', motorizacao: ''});
        setIpva('');
    }

    function calculaIpva() {
        let anoAtual = new Date().getFullYear();
        let diff = anoAtual - parseInt(data.ano);

        if (diff >= 20)
            setIpva("Não paga IPVA");
        
        if (data.motorizacao == 3)
            setIpva("Valor à pagar: " + data.valor * TAXA_ETANOL);
        else 
            setIpva("Valor à pagar: " + data.valor * TAXA_GERAL);
    }

    return(
        <section className="w-1/2">
            <div className="text-xl font-bold text-center my-4">{ipva}</div>
            <div>{message.map((value) => <span key={value} className="flex flex-col bg-red-200 p-4 rounded-md my-4 font-bold">{value}</span>)}</div>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-8">
                    <div className="flex-auto">
                        <Label htmlFor="valor">Valor</Label>
                        <TextInput type="number" name="valor" value={data.valor} onChange={handleData} id="valor" />
                    </div>
                    <div className="flex-auto">
                        <Label htmlFor="ano">Ano de fabricação</Label>
                        <TextInput type="number" step={0.01} name="ano" value={data.ano} onChange={handleData} id="ano" />
                    </div>
                    <div className="flex-auto">
                        <Label htmlFor="motorizacao">Motorização</Label>
                        <Select name="motorizacao" value={data.motorizacao} onChange={handleData} id="motorizacao">
                            <option value="">Escolha uma opção</option>
                            <option value="1">Gasolina</option>
                            <option value="2">Diesel</option>
                            <option value="3">Etanol</option>
                            <option value="4">Flex</option>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end mt-4 gap-4">
                    <Button color="light" type="button" onClick={handleClear}>Limpar</Button>
                    <Button color="success" type="submit">Enviar</Button>
                </div>
            </form>

            <div className="flex justify-center items-center gap-8  mt-20">
				<a className="font-bold hover:underline transition-all" href="/">⬅ Exercício anterior</a>
				<a className="font-bold hover:underline transition-all" href="/teclado">Próximo exercício ➡</a>
			</div>
        </section>
    )
}