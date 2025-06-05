'use server'

export async function Obter() {
    let resultado = [];

    await fetch(`${process.env.API_URL}/docentes`).then(async (result) => {
        if (result.status === 200) {
            await result.json().then((data) => {
                resultado = data;
            });
        }
    });

    return resultado;
}