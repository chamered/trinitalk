<script>
	//import favicon from '$lib/assets/favicon.png';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import CookieBanner from '../components/CookieBanner.svelte';	
			
	onMount(async () => {
		await import('bootstrap/dist/js/bootstrap.bundle.min.js');
	});

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->

{#if $page.url.pathname !== '/login'}
	<Navbar />
{/if}
{@render children()}

<Footer />

<CookieBanner />
