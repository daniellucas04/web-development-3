'use client'

import { Button, Card } from 'flowbite-react'; 
import { useState } from 'react';

export default function Biblioteca({ winner, children }){
    return (
        <Card className={`w-56 h-56 flex justify-center items-center font-medium ${winner && 'scale-110'} transition-all`}>
            {children}
            {winner && <span className='text-sm font-bold text-emerald-600 text-center'>👑 Vencedor</span>}
        </Card>
    );
}