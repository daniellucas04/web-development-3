'use client'

import { useState } from "react"
import Biblioteca from "./components/biblioteca"
import { Button } from "flowbite-react"

export default function Home(){
	const [winner, setWinner] = useState({
		tailwind: false,
		materialize: false,
		bootstrap: false,
	});
	const [tailwindVotes, setTailwindVotes] = useState(1);
	const [materializeVotes, setMaterializeVotes] = useState(1);
	const [bootstrapVotes, setBootstrapVotes] = useState(1);

	function handleTailwindVotes() {
		setTailwindVotes(tailwindVotes + 1);

		if (tailwindVotes == 10)
			setWinner(tailwindVotes => ({...tailwindVotes, tailwind: true}));
	}

	function handleMaterializeVotes() {
		setMaterializeVotes(materializeVotes + 1);

		if (materializeVotes == 10)
			setWinner(materializeVotes => ({...materializeVotes, materialize: true}));
	}

	function handleBootstrapVotes() {
		setBootstrapVotes(bootstrapVotes + 1);

		if (bootstrapVotes == 10)
			setWinner(setBootstrapVotes => ({...setBootstrapVotes, bootstrap: true}));
	}

	function hasWinner() {
		if (winner.tailwind)
			return true;

		if (winner.materialize)
			return true;

		if (winner.bootstrap)
			return true;
	
		return false;
	}

	return (
		<section className="flex flex-col items-center justify-center h-screen">
			<div className="flex gap-8">
				<div className="flex flex-col gap-4">
					<Biblioteca
						winner={winner.tailwind}
					>Tailwind</Biblioteca>
					<Button onClick={handleTailwindVotes} disabled={hasWinner() ? true : false}>Votar</Button>	
				</div>
				<div className="flex flex-col gap-4">
					<Biblioteca
						winner={winner.materialize}
					>Materialize</Biblioteca>
					<Button onClick={handleMaterializeVotes} disabled={hasWinner() ? true : false}>Votar</Button>	
				</div>
				<div className="flex flex-col gap-4">
					<Biblioteca
						winner={winner.bootstrap}
					>Bootstrap</Biblioteca>
					<Button onClick={handleBootstrapVotes} disabled={hasWinner() ? true : false}>Votar</Button>
				</div>
			</div>

			<div className="mt-20">
				<a className="font-bold hover:underline transition-all" href="/ipva">Próximo exercício ➡</a>
			</div>
		</section>
	)
}