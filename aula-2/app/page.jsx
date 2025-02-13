import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Equipamento from "./equipamento";

export default function Home() {
	return (
		<Flowbite>
			<main className="dark:bg-zinc-900 dark:text-zinc-300">
				<div className="text-end">
					<DarkThemeToggle className="border-2 m-5" />
				</div>
				<section className="flex flex-col items-center justify-center h-screen">
					<h1 className="font-bold text-4xl">Mesa de som</h1>
					<div className="grid grid-cols-3 m-8 gap-8">
						<Equipamento title={'Microfone'} defaultVolume={3} color={'blue'} />
						<Equipamento title={'Guitarra'} defaultVolume={4} />
						<Equipamento title={'Bateria'} defaultVolume={6} />
						<Equipamento title={'Baixo'} defaultVolume={6} />
					</div>
				</section>
			</main>
		</Flowbite>
	)
}