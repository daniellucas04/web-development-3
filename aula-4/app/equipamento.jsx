'use client'

import { Button } from "flowbite-react";
import { useState } from "react";

export default function Equipamento({ title }) {
    const [isOn, setIsOn] = useState(false);

    function handleTurnEquipmentOnOff() {
        setIsOn(!isOn);
    }

    return (
        <div className="flex items-center gap-4">
            <span className="">{title}</span>
            <Button onClick={handleTurnEquipmentOnOff} color={(isOn) ? 'blue' : 'light'}>{(isOn) ? 'Ligado' : 'Desligado'}</Button>
        </div>
    )
}