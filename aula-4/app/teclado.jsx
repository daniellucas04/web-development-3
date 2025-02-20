'use client'

import { Button } from "flowbite-react";
import { useState } from "react";

export default function Teclado() {
    const [word, setWord] = useState('');
    const [words, setWords] = useState([]);
    const [isCaps, setIsCaps] = useState(false);
    const [keys, setKeys] = useState([
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç',
        'z', 'x', 'c', 'v', 'b', 'n', 'm'
    ]);

    function handleCapslockKey() {
        setIsCaps(!isCaps);
    }

    function handleSpaceKey() {
        setWord(word + ' ');
    }

    function handleBackspaceKey() {
        let string = word.slice(0, word.length - 1);

        setWord(string);
    }

    function handleEnterKey() {
        if (word != '') {
            words.push(word);
            setWord('');
        }   
    }

    function handleKeyboardClick(event) {
        let value = event.target.innerText;
     
        setWord(word + value);
    }

    function handleClear() {
        setWord('');
        setWords([]);
        setIsCaps(false);
    }

    return(
        <div className="flex gap-8 items-center">
            <div className="ml-48">
                <div className="text-center font-medium text-xl my-4 h-20">{(word == '') ? 'Comece a digitar...' : word}</div>
                <div className="flex justify-end gap-4">
                    <Button color="light" onClick={handleClear}>Clear</Button>
                    <Button onClick={handleEnterKey}>Enter</Button>
                </div>
                <div className="grid grid-cols-10 py-8 gap-2">
                    {keys.map((key) => <Button onClick={handleKeyboardClick} color="light" key={key}>{(isCaps) ? String(key).toUpperCase() : key}</Button>)}
                    <Button color="dark" onClick={handleCapslockKey}>Capslock</Button>
                    <Button color="blue" onClick={handleSpaceKey}>Space</Button>
                    <Button color="failure" onClick={handleBackspaceKey}>Backspace</Button>
                </div>
            </div>
            <div>
                <h1 className="text-xl">Lista de palavras</h1>
                <ul className="flex flex-col gap-4">
                    {words.map((word) => <li key={word} className="font-bold">- {word}</li>)}
                </ul>
            </div>
        </div>
    )
}