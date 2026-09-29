<script>
    import Icon from "@iconify/svelte";
    import ProfileIcon from "./ProfileIcon.svelte";
    import { supabase } from "$lib/supabaseClient.js";
    import { getAuth } from "../lib/utils.svelte.js";
    
    let { onclick } = $props();

    const auth = getAuth();
    let user = $derived(auth.user);
    // Derived variable which extracts the name from the user metadata
    let name = $derived(user?.user_metadata?.name ?? "User");

    async function handleLogout() {
        // User will be automatically be null due to the auth state change listener
        await supabase.auth.signOut();
        if (onclick) onclick();
    }
</script>

{#if user}
<div class="d-flex align-items-center gap-2">
    <span class="text-white text-nowrap">Ciao, {name}</span>
    <div class="dropdown">
        <div
            class="p-0 border-0 bg-transparent d-flex align-items-center"
            style="cursor: pointer;"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title={name}
        >
            <ProfileIcon name={name}/>
        </div>
        <ul class="dropdown-menu dropdown-menu-end">
            <li>
                <a class="dropdown-item d-flex align-items-center" href="/profile" onclick={onclick}>
                    <Icon icon="mingcute:user-3-line" class="me-1" width="20" height="20" />
                    Profilo
                </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
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
    <a href="/login" class="btn btn-custom" onclick={onclick}>Accedi</a>
</div>
{/if}
