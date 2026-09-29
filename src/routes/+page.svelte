<script>
    import QuestionBox from "../components/QuestionBox.svelte";

    // Risultato della form action definita in +page.server.js
    let { form } = $props();
</script>
<svelte:head>
	<title>TriniBox</title>
</svelte:head>

<div class="d-flex justify-content-center align-items-center min-vh-100 py-4">
    <QuestionBox {form}/>
</div>
