'use client'

import { useEffect, useState } from "react";
import { getAllContacts, getContactsWithFilter, removeContact } from "../actions";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ListarContatos() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState({
        value: '',
    });
    const router = useRouter();
    async function fetchAllContacts() {
        try {
            const results = await getAllContacts();
            setContacts(results);
        } catch (error) {
            Swal.fire({
                text: error,
                icon: 'error',
                timer: 3000,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });
        }
    }

    async function handleFilter(event) {
        event.preventDefault();
        
        const results = await getContactsWithFilter(filter.value);
        setContacts(results);
    }

    function handleFilterChange(event) {
        setFilter(p => ({value: event.target.value}));
    }

    async function handleRemoveContact(id) {
        const response = confirm('Deseja remover esta pessoa da sua lista de contato?')
        if (response) {
            try {
                await removeContact(id);
    
                Swal.fire({
                    text: 'Contato removido com sucesso!',
                    icon: 'success',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                });

                window.location.reload();
            } catch (error) {
                Swal.fire({
                    text: error,
                    icon: 'error',
                    timer: 3000,
                    toast: true,
                    position: "top-right",
                    showConfirmButton: false
                });
            }
        }
    }

    useEffect(() => {
        fetchAllContacts();
    }, []);

    return (
        <div className="m-10 space-y-4 flex flex-col items-center justify-center">
            <div className="flex flex-col w-xl">
                <h1 className="text-lg font-bold text-zinc-600 mb-4">Lista de contatos</h1>
                <form onSubmit={handleFilter} className="my-4">
                    <div className="flex gap-4">
                        <input onChange={handleFilterChange} value={filter.value} className="flex-auto border border-zinc-300 rounded py-1 px-2" type="text" id="filter" name="filter" />
                        <button className="bg-blue-500 text-white border border-blue-400 rounded py-2 px-4 hover:bg-blue-600 hover:text-zinc-100 cursor-pointer" type="submit">Pesquisar</button>
                    </div>
                </form>
                <Link href={`/new`} className="text-center bg-blue-500 text-white border border-blue-400 rounded py-2 px-4 hover:bg-blue-600 hover:text-zinc-100 cursor-pointer">Novo</Link>
            </div>

            <section className="border border-zinc-400 rounded-md p-8 w-xl max-h-120 overflow-auto">
                <ul className="list-none space-y-4">
                    {contacts.map((contact) => {
                        return (
                            <li key={contact.id} className="flex justify-between items-center mx-2 font-bold border-b border-zinc-200">
                                <a href={`/contact/${contact.id}`}>{contact.name}</a>
                                <div className="space-x-4 m-2">
                                    <Link href={`/edit/${contact.id}`} className="text-blue-500 border border-blue-500 px-1 rounded text-sm hover:bg-blue-500 hover:text-white cursor-pointer">Editar</Link>
                                    <button onClick={() => {handleRemoveContact(contact.id)}} className="text-red-500 border border-red-500 px-1 rounded text-sm hover:bg-red-500 hover:text-white cursor-pointer">Remover</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>
    );
}