<script>
    import Icon from "@iconify/svelte";
    import QuestionCard from '../../components/QuestionCard.svelte';

    let { data } = $props();
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
        <div>
            <a class="btn btn-custom d-flex justify-content-center align-items-center gap-1 my-3" href="/">
                <Icon icon="icon-park-outline:write" width="18" height="18" />
                Fai una Domanda
            </a>
        </div>
    </div>
    
    <div class="row g-3 h-100">
        {#each data.questions as item}
            <div class="col-12">
                <QuestionCard item={item}/>
            </div>
        {/each}
    </div>
</div>