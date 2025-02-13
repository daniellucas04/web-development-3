'use client'

import { useState } from "react";
import { Button, RangeSlider } from "flowbite-react"

export default function Equipamento({title, defaultVolume}) {
    const [volume, setVolume] = useState(defaultVolume);
    const [disabled, setDisabled] = useState(false);

    function handleIncreaseVolume() {
        if (volume >= 10 || disabled) return;

        setVolume(volume + 1);
    }
    
    function handleDecreaseVolume() {
        if (volume <= 0 || disabled) return;

        setVolume(volume - 1);
    }

    function handleVolumeChange(event) {
        setVolume(Number(event.target.value));
    }

    return (
        <div className={`flex flex-col space-x-2 space-y-4 items-center border-2 rounded-lg px-2 py-8 shadow w-96 dark:border-zinc-500 dark:shadow-zinc-800`}>
            <h1 className="font-bold text-2xl">{title}</h1>
            <div className="flex gap-4 items-center">
                <Button color="light" onClick={handleDecreaseVolume}>-1</Button>
                <Button color={(disabled) ? 'failure' : 'light'} onClick={() => {setVolume(0); setDisabled(!disabled)}}>Mute</Button>
                <Button color="light" onClick={handleIncreaseVolume}>+1</Button>
            </div>
            <RangeSlider className="w-56" type="range" onChange={handleVolumeChange} min={0} max={10} value={volume} disabled={disabled} />
            <span className="text-gray-400 font-medium text-lg">{volume}</span>
        </div>
    )
}