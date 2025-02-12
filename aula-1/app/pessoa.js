import { Card } from "flowbite-react";

export function Pessoa({nome, dataNascimento, endereco, cidade, estado, cep}) {
    return (
        <Card>
            <h5 className="font-bold tracking-tight text-gray-900 ">{nome} - {dataNascimento}</h5>
            <p className="text-gray-700">Endereço: {endereco}</p>
            <p className="text-gray-700">Cidade: {cidade} - {estado}</p>
            <p className="text-gray-700">CEP: {cep}</p>
        </Card>
    )
}