import { supabase } from '$lib/supabaseClient.js';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const nome = formData.get('nome');
        const domanda = formData.get('domanda');

        if (!domanda) return { success: false, message: 'Compila tutti i campi!' };

        try {
            const { error } = await supabase
                .from('domande')
                .insert([
                    { nome: nome && nome.trim() !== '' ? capitalizeFirstChar(nome) : 'Utente Anonimo', domanda: domanda }
                ]);
            
            if (error) throw error; 

            return { success: true, message: 'Domanda salvata!' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Errore nel salvataggio.' };
        }
    }
}

function capitalizeFirstChar(string) {
    const STRINGS = string.split(" ");
    let result = "";

    STRINGS.forEach(element => {
        const firstChar = element.charAt(0).toUpperCase();
        result += firstChar + element.slice(1) + " ";
    });

    return result;
}