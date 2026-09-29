<script>
    import Icon from "@iconify/svelte";
    import QuestionCard from '../../components/QuestionCard.svelte';
    import { supabase } from "$lib/supabaseClient";
    import { goto } from "$app/navigation";
    import { getAuth } from "$lib/utils.svelte.js";
    
    let { data } = $props();

    // Reference the globally synchronized auth state
    const auth = getAuth();
    let currentUser = $derived(auth.user);

    let questions = $state(data.questions);
    let sortBy = $state('likes');
    let activeTab = $state('unanswered');
    let voteError = $state('');

    // In-flight requests, per evitare doppi submit su una domanda già votata
    let pendingVotes = $state([]);

    let filteredQuestions = $derived(questions.filter(q => {
        if (activeTab === 'all') return true;
        if (activeTab === 'answered') return q.episode_url !== null;
        if (activeTab === 'unanswered') return q.episode_url === null;
        return true;
    }));

    let sortedQuestions = $derived([...filteredQuestions].sort((a, b) => {
        if (sortBy === 'likes') {
            return b.upvotes.length - a.upvotes.length || new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
    }));

    /**
     * Handles upvoting or removing an upvote from a question.
     * Includes optimistic UI updates for instant feedback before verifying
     * the transaction with the Supabase database.
     * 
     * @param {number} questionId - The ID of the question to toggle upvote on.
     * @returns {Promise<void>}
     */
    async function toggleUpvote(questionId) {
        // Requires authentication to vote
        if (!currentUser) {
            alert("Devi accedere per poter votare una domanda!");
            goto('/login');
            return;
        }

        // Ignora i secondi click mentre la richiesta è ancora in volo
        if (pendingVotes.includes(questionId)) return;

        const questionIndex = questions.findIndex(q => q.id === questionId);
        if (questionIndex === -1) return;

        const question = questions[questionIndex];
        const hasUpvoted = question.upvotes.some(v => v.user_id === currentUser.id);

        // Snapshot per ripristinare lo stato se il database rifiuta l'operazione
        const previousUpvotes = [...question.upvotes];

        pendingVotes = [...pendingVotes, questionId];
        voteError = '';

        if (hasUpvoted) {
            // Remove upvote optimistically for instant UI feedback, then delete from database
            questions[questionIndex].upvotes = question.upvotes.filter(v => v.user_id !== currentUser.id);

            const { error } = await supabase.from('upvotes')
                .delete()
                .match({ question_id: questionId, user_id: currentUser.id });

            if (error) {
                questions[questionIndex].upvotes = previousUpvotes;
                voteError = 'Non è stato possibile annullare il tuo voto. Riprova.';
            }
        } else {
            // Add upvote optimistically for instant UI feedback, then insert into database
            questions[questionIndex].upvotes = [...question.upvotes, { user_id: currentUser.id }];

            const { error } = await supabase.from('upvotes')
                .insert({ question_id: questionId, user_id: currentUser.id });

            if (error) {
                questions[questionIndex].upvotes = previousUpvotes;
                voteError = 'Non è stato possibile registrare il tuo voto. Riprova.';
            }
        }

        pendingVotes = pendingVotes.filter(id => id !== questionId);
    }
</script>
<svelte:head>
	<title>TriniBox - Domande</title>
</svelte:head>

<div class="container py-3">
    <div class="d-md-flex justify-content-between align-items-center mb-3">
        <div>  
            <h2 class="text-white">
                {#if activeTab === 'all'}Tutte le Domande{/if}
                {#if activeTab === 'answered'}Risposte{/if}
                {#if activeTab === 'unanswered'}Domande{/if}
            </h2>
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

    {#if voteError}
        <div class="alert alert-danger d-flex justify-content-between align-items-center gap-2 p-2 mt-0" role="alert">
            <span class="d-flex align-items-center gap-1">
                <Icon icon="mingcute:alert-fill" width="20" height="20" />
                {voteError}
            </span>
            <button type="button" class="btn btn-sm btn-outline-light border-0 p-1" aria-label="Chiudi avviso" onclick={() => voteError = ''}>
                <Icon icon="mingcute:close-line" width="18" height="18" />
            </button>
        </div>
    {/if}

    <ul class="nav nav-underline mb-2">
        <li class="nav-item">
            <button class="nav-link {activeTab === 'unanswered' ? 'active' : ''}" type="button" onclick={() => activeTab = 'unanswered'}>Domande</button>
        </li>
        <li class="nav-item">
            <button class="nav-link {activeTab === 'answered' ? 'active' : ''}" type="button" onclick={() => activeTab = 'answered'}>Risposte</button>
        </li>
        <li class="nav-item">
            <button class="nav-link {activeTab === 'all' ? 'active' : ''}" type="button" onclick={() => activeTab = 'all'}>Tutte</button>
        </li>
    </ul>
    
    <div class="row g-3 h-100">
        {#each sortedQuestions as item}
            <div class="col-12">
                <QuestionCard
                    {item}
                    {currentUser}
                    isPending={pendingVotes.includes(item.id)}
                    onToggleUpvote={() => toggleUpvote(item.id)}
                />
            </div>
        {/each}
    </div>
</div>

<style>
    .nav-link {
        color: #FB7185;
        transition: all 0.3s ease;
    }

    .nav-link:hover, .nav-link:focus {
        color: white;
    }

    .nav-link.active {
        color: white !important;
        font-weight: bold;
        border-bottom-color: #ED4503 !important;
    }
</style>