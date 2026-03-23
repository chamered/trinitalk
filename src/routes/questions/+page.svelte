<script>
    import Icon from "@iconify/svelte";
    import QuestionCard from '../../components/QuestionCard.svelte';
    import { supabase } from "$lib/supabaseClient";
    import { goto } from "$app/navigation";
    
    let { data } = $props();

    // Track the currently logged-in user
    let currentUser = $state(null);

    // Fetch initial user session and listen for any authentication state changes (login/logout)
    $effect(() => {
        supabase.auth.getSession().then(({ data }) => {
            currentUser = data.session?.user ?? null;
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            currentUser = session?.user ?? null;
        });
        return () => subscription.unsubscribe();
    });

    let questions = $state(data.questions);
    let sortBy = $state('likes');

    let sortedQuestions = $derived([...questions].sort((a, b) => {
        if (sortBy === 'likes') {
            return b.upvotes.length - a.upvotes.length || new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
    }));

    // Handle upvoting or removing an upvote from a question
    async function toggleUpvote(questionId) {
        // Requires authentication to vote
        if (!currentUser) {
            alert("Devi accedere per poter votare una domanda!");
            goto('/login');
            return;
        }

        const questionIndex = questions.findIndex(q => q.id === questionId);
        if (questionIndex === -1) return;

        const question = questions[questionIndex];
        const hasUpvoted = question.upvotes.some(v => v.user_id === currentUser.id);

        if(hasUpvoted) {
            // Remove upvote optimistically for instant UI feedback, then delete from database
            questions[questionIndex].upvotes = question.upvotes.filter(v => v.user_id !== currentUser.id);
            
            await supabase.from('upvotes')
                .delete()
                .match({ question_id: questionId, user_id: currentUser.id });
        } else {
            // Add upvote optimistically for instant UI feedback, then insert into database
            questions[questionIndex].upvotes.push({ user_id: currentUser.id });

            await supabase.from('upvotes')
                .insert({ question_id: questionId, user_id: currentUser.id });
        }
    }
</script>
<svelte:head>
	<title>TriniBox - Domande</title>
</svelte:head>

<div class="container py-3">
    <div class="d-md-flex justify-content-between align-items-center mb-3">
        <div>  
            <h2 class="text-white">Tutte le Domande</h2>
            <p class="text-light m-0">Naviga tra tutte le domande fatte dalla nostra community.</p>
        </div>
        <div class="d-flex flex-column flex-md-row align-items-md-center gap-3 my-3 my-md-0">
            <select class="form-select select-custom" bind:value={sortBy}>
                <option value="likes">Più Piaciute</option>
                <option value="recent">Più Recenti</option>
            </select>
            <a class="btn btn-custom d-flex justify-content-center align-items-center gap-1 text-nowrap" href="/">
                <Icon icon="icon-park-outline:write" width="18" height="18" />
                Fai una Domanda
            </a>
        </div>
    </div>
    
    <div class="row g-3 h-100">
        {#each sortedQuestions as item, index}
            <div class="col-12">
                <QuestionCard {item} {index} {currentUser} onToggleUpvote={() => toggleUpvote(item.id)} />
            </div>
        {/each}
    </div>
</div>