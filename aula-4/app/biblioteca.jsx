'use client'

import { Badge, Card } from "flowbite-react";

export default function Biblioteca({ text, votes, winner }) {
    return (
        <Card className="w-44 h-36 text-center font-medium">
            {text} {winner && `- ${votes}`}
            <span className="flex justify-center">
                {winner == String(text).toLowerCase() && <Badge className="w-fit" size="xs" color="success">Vencedor</Badge>}
            </span>
        </Card>
    )
}