'use client'

import { Button } from "flowbite-react";
import Equipamento from "./equipamento";
import Linguagem from "./linguagem";
import { useState } from "react";
import Biblioteca from "./biblioteca";
import Teclado from "./teclado";

export default function Home(){
	const [rubyVotes, setRubyVotes] = useState(0);
	const [pascalVotes, setPascalVotes] = useState(0);
	const [bootstrapVotes, setBootstrapVotes] = useState(0);
	const [tailwindVotes, setTailwindVotes] = useState(0);
	const [materializeVotes, setMaterializeVotes] = useState(0);
	const [winner, setWinner] = useState('');

	function handleBootstrapVotes() {
		setBootstrapVotes(bootstrapVotes + 1);

		if ((bootstrapVotes + 1) === 10){
			setWinner('bootstrap');
		}
	}

	function handleTailwindVotes() {
		setTailwindVotes(tailwindVotes + 1);

		if ((tailwindVotes + 1) === 10){
			setWinner('tailwind');
		}
	}

	function handleMaterializeVotes() {
		setMaterializeVotes(materializeVotes + 1);

		if ((materializeVotes + 1) === 10){
			setWinner('materialize');
		}
	}

	return (
		<section className="flex flex-col items-center space-y-8 my-40 divide-y justify-center h-screen">
			<div>
				<Equipamento title={"Microfone"}/>
			</div>
			<div className="grid grid-cols-2 gap-4 py-8 place-items-center justify-items-center">
				<div className="flex flex-col items-center gap-4">
					<Linguagem 
						text={'Ruby'} 
						votes={rubyVotes} 
						winner={(rubyVotes > pascalVotes ? true : false)} 
						draw={(rubyVotes == pascalVotes) ? true : false} 
					/>
					<Button onClick={() => setRubyVotes(rubyVotes + 1)} className="w-full" size="sm" color="light">Votar</Button>
				</div>
				<div className="flex flex-col items-center gap-4">
					<Linguagem 
						text={'Pascal'} 
						votes={pascalVotes} 
						winner={(pascalVotes > rubyVotes ? true : false)} 
						draw={(rubyVotes == pascalVotes) ? true : false} 
					/>
					<Button onClick={() => setPascalVotes(pascalVotes + 1)} className="w-full" size="sm" color="light">Votar</Button>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4 py-8 place-items-center justify-items-center">
				<div className="flex flex-col items-center gap-4">
					<Biblioteca text={'Bootstrap'} votes={bootstrapVotes} winner={winner} />
					<Button 
						onClick={handleBootstrapVotes} 
						disabled={winner != '' && true} 
						className="w-full" 
						size="sm" 
						color="light"
					>Votar</Button>
				</div>
				<div className="flex flex-col items-center gap-4">
					<Biblioteca text={'Tailwind'} votes={tailwindVotes} winner={winner} />
					<Button 
						onClick={handleTailwindVotes} 
						disabled={winner != '' && true} 
						className="w-full" 
						size="sm" 
						color="light"
					>Votar</Button>
				</div>
				<div className="flex flex-col items-center gap-4">
					<Biblioteca text={'Materialize'} votes={materializeVotes} winner={winner} />
					<Button 
						onClick={handleMaterializeVotes} 
						disabled={winner != '' && true} 
						className="w-full" 
						size="sm"
						color="light"
					>Votar</Button>
				</div>
				<div></div>
				<Button onClick={() => {setWinner(''); setBootstrapVotes(0); setMaterializeVotes(0); setTailwindVotes(0)}}>Reiniciar</Button>
				<div></div>
			</div>
			<div>
				<Teclado />
			</div>
		</section>
	)
}