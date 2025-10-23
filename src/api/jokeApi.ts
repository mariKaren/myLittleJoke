export interface Joke {
    id: number;
    type: "single" | "twopart";
    joke?: string;
    setup?: string;
    delivery?: string;
    category: string;
}

export const fetchJoke = async (category: string): Promise<Joke> => {
    const url = `https://v2.jokeapi.dev/joke/${category}`;
    try {
        const res = await fetch(url);

        //Verifica si la respuesta HTTP es OK
        if (!res.ok) {
            throw new Error(`Error en la solicitud HTTP: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        // Verifica si la API devuelve un error (ej la propiedad 'error' es true)
        if (data.error === true) {
            throw new Error(data.message || 'La API devolvió un error inesperado.');
        }

        return data as Joke; 
        
    } catch (error) {
        console.error(`Fallo al obtener el chiste para la categoría ${category}:`, error);
        throw error;
    }
};
