<script>
    import QuestionCard from '../../components/QuestionCard.svelte';

    let { data } = $props();
</script>
<svelte:head>
	<title>TriniBox - Domande</title>
</svelte:head>

<div class="container py-3">
    <h2 class="text-white">Tutte le Domande</h2>
    <p class="text-light">Naviga tra tutte le domande fatte dalla nostra community.</p>
    
    <div class="row mt-4 g-3 h-100">
        {#each data.domande as item}
            <div class="col-12 col-md-6 col-lg-4">
                <QuestionCard item={item}/>
            </div>
        {/each}
    </div>
</div>