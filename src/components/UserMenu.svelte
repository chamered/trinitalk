<script>
    import Icon from "@iconify/svelte";
    import { supabase } from "$lib/supabaseClient.js";
    import { setupProfileIcon, useAuth } from "../lib/utils.svelte.js";
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    const auth = useAuth();
    let user = $derived(auth.user);
    // Dervied variable which extracts the name from the user metadata
    let name = $derived(user?.user_metadata?.name ?? "User");

    async function handleLogout() {
        // User will be automatically be null due to the auth state change listener
        await supabase.auth.signOut();
        dispatch('click');
    }
</script>

{#if user}
<div class="d-flex align-items-center gap-2">
    <span class="text-white text-nowrap">Ciao, {name}</span>
    <div class="dropdown">
        <div
            class="rounded-circle d-flex justify-content-center align-items-center text-white"
            style="width: 45px; height: 45px; background-color: #007bff; cursor: pointer;"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <span class="fw-bold">{setupProfileIcon(name)}</span>
        </div>
        <ul class="dropdown-menu dropdown-menu-end">
            <li>
                <a class="dropdown-item text-danger d-flex align-items-center" href="/login" onclick={handleLogout}>
                    <Icon icon="material-symbols:logout-rounded" class="me-1" width="20" height="20" />
                    Logout
                </a>
            </li>
        </ul>
    </div>
</div>
{:else}
<div class="">
    <a href="/login" class="btn btn-custom" onclick={() => dispatch('click')}>Accedi</a>
</div>
{/if}