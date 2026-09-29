<script>
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';

	// Messaggi più utili per i casi che si presentano davvero nel progetto.
	const MESSAGES = {
		404: "Questa pagina non esiste. Forse la domanda che cercavi è stata rimossa?",
		500: "Qualcosa è andato storto dalla nostra parte. Riprova tra poco."
	};

	let title = $derived(page.status === 404 ? 'Pagina non trovata' : 'Errore');
	let description = $derived(MESSAGES[page.status] ?? "Si è verificato un errore imprevisto.");
</script>

<svelte:head>
	<title>TriniTalk - {title}</title>
</svelte:head>

<div class="d-flex justify-content-center align-items-center min-vh-100 py-4">
	<div class="card border-custom bg-custom border-2 shadow-lg mx-3 text-white w-100" style="max-width: 450px;">
		<div class="card-header border-custom-2 border-4">
			<h2 class="card-title d-flex justify-content-center align-items-center gap-2 m-0">
				<Icon icon="mingcute:alert-fill" width="28" height="28" class="text-custom" />
				{title}
			</h2>
		</div>
		<div class="card-body">
			<p class="fw-light text-center mb-1">{page.status}</p>
			<p class="fw-light text-center mb-4">{description}</p>
			<a href="/" class="btn btn-custom w-100 mb-2">Torna alla home</a>
			<a href="/questions" class="btn btn-outline-light w-100">Vedi le domande</a>
		</div>
	</div>
</div>
