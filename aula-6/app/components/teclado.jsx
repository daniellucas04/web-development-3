'use client'

import { useState } from "react";
import {Button, TextInput} from 'flowbite-react';

export default function TecladoComponent() {
    const [text, setText] = useState('');
    const [capslock, setCapslock] = useState(false);
    const [shift, setShift] = useState(false);
    const [keys, setKeys] = useState([
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç',
        'z', 'x', 'c', 'v', 'b', 'n', 'm'
    ]);

    function handleKeyboardClick(event) {
        if (capslock && shift) {
            setText(keys => keys + String(event.target.innerText).toLowerCase())
            setShift(false);
        } else if (!capslock && shift) {
            setText(keys => keys + String(event.target.innerText).toUpperCase())
            setShift(false);
        }
        else
            setText(keys => keys + event.target.innerText);

    }

    function handleClear() {
        setText('');
    }

    function handleSpace() {
        setText(text => text + ' ');
    }

    function handleBackspace() {
        let newText = text.substring(0, text.length - 1);
        setText(newText);
    }

    function handleCapslock() {
        setCapslock(!capslock);
    }

    function handleShift() {
        setShift(!shift);
    }

    return (
        <div className="flex flex-col gap-8">
            <input type="text" className="border-0 border-b border-b-gray-300" value={text} disabled />
            <div className="grid grid-cols-10 gap-4">
                {keys.map((key) => <Button className="p-2" onClick={handleKeyboardClick} color="light" key={key}>
                    {(capslock ^ shift) ? String(key).toUpperCase() : key}
                </Button>)}
            </div>
            <div className="flex gap-4">
                <Button onClick={handleCapslock} color="blue" outline={capslock ? false : true}>Capslock</Button>
                <Button onClick={handleShift} color="blue" outline={shift ? false : true}>Shift</Button>
                <Button onClick={handleClear} color="red">Clear</Button>
                <Button onClick={handleSpace} color="light">Space</Button>
                <Button onClick={handleBackspace} color="red">Backspace</Button>
            </div>
        </div>
    );
}