'use client'

import { Badge, Card } from "flowbite-react";

export default function Biblioteca({ text, votes, winner }) {
    return (
        <Card className="w-44 h-36 text-center font-medium">
            <span className="flex justify-center">
                {winner && <Badge className="w-fit" size="xs" color="success">Vencedor</Badge>}
            </span>
            {text} {winner && `- ${votes}`}
        </Card>
    )
}