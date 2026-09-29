<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import CookieBanner from '../components/CookieBanner.svelte';	
	import { initAuth } from '$lib/utils.svelte.js';

	onMount(async () => {
		// Bootstrap's JS is loaded client-side only: it powers the
		// data-API dropdown in UserMenu.
		await import('bootstrap/dist/js/bootstrap.bundle.min.js');

		// Start the global auth listener once. It returns its own cleanup,
		// which onMount invokes on unmount.
		return initAuth();
	});

	let { children } = $props();
</script>

<div class="d-flex flex-column min-vh-100">
	{#if page.url.pathname !== '/login'}
		<Navbar />
	{/if}

	<main class="flex-grow-1">
		{@render children()}
	</main>

	{#if page.url.pathname !== '/login'}
		<Footer />
	{/if}
</div>

<CookieBanner />
