import { supabase } from '$lib/supabaseClient';

export const load = async () => {
    // Get all questions from the database
    const { data, error } = await supabase
        .from('questions')
        .select('*, upvotes(user_id)')
        .order('created_at', { ascending: false });

    // If there is an error, return an empty array
    if (error) {
        console.error("Errore caricamento:", error);
        return { questions: [] };
    }

    const sortedQuestions = data.sort((a, b) => b.upvotes.length - a.upvotes.length);

    // Return the questions
    return {
        questions: sortedQuestions
    };
};