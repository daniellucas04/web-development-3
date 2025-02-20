'use client'

import { Badge, Card } from "flowbite-react";

export default function Linguagem({ text, votes, winner, draw }) {
    return (
        <Card className="w-40 h-36 text-center font-medium">
            <span className="flex justify-center">
                {draw && <Badge className="w-fit" size="xs" color="light">Empate</Badge>}
                {winner && <Badge className="w-fit" size="xs" color="pink">Favorita</Badge>}
            </span>
            {text} - {votes}
        </Card>
    )
}