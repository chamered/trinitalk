import { supabase } from '$lib/supabaseClient';

export const load = async () => {
    const { data, error } = await supabase
        .from('domande')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Errore caricamento:", error);
        return { domande: [] };
    }

    return {
        domande: data ?? []
    };
};