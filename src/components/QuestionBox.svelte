<script>
    import Icon from "@iconify/svelte";
    import { enhance } from "$app/forms";
    import { useValidation, getAuth } from "../lib/utils.svelte.js";

    let { form } = $props();

    const validator = useValidation();
    const auth = getAuth();
    
    // State variables for pre-filling the user's name
    let userName = $state("");
    let lastUserId = $state(null);

    // Watch for authentication changes and automatically fill the name input
    // if a user logs in, or clear it if they log out
    $effect(() => {
        const user = auth.user;
        if (user) {
            // Only update the name if the user has changed to avoid overwriting user edits
            if (user.id !== lastUserId) {
                userName = user.user_metadata?.name ?? "";
                lastUserId = user.id;
            }
        } else {
            // Clear the input and reset tracked user ID on logout
            userName = "";
            lastUserId = null;
        }
    });
</script>

<div class="card border-custom bg-custom border-2 shadow-lg mx-3" style="width: 450px;">
    <div class="card-header border-custom-2 border-4">
        <h2 class="card-title text-white d-flex justify-content-center m-0">
            Trini<span class="text-custom">Box</span>
        </h2>
    </div>
    <div class="card-body text-white">
        <p class="card-text text-center fw-light mb-3">
            Hai dubbi o curiosità sulla religione cattolica?
            Fai una domanda e ti risponderemo nel podcast!
        </p>
        <form class:was-validated={validator.isActive} method="POST" use:enhance={validator.serverSubmit} novalidate>
            <div>
                <label for="name" class="mb-1">Nome <small class="fw-lighter fst-italic"> (Opzionale)</small></label>
                <input type="text" name="name" bind:value={userName} class="form-control input" placeholder="Inserisci il tuo nome">
            </div>
            <div class="my-3">
                <label for="question" class="mb-1">Domanda</label>
                <textarea name="question" class="form-control input" rows="3" placeholder="Scrivi qui la tua domanda..." required></textarea>
                <div class="invalid-feedback">
                    Bro, la domanda...
                </div>
            </div>
            <button type="submit" class="btn btn-custom w-100 mb-2">Invia Domanda</button>
            <a href="/questions" class="btn btn-outline-light w-100">Visualizza Tutte le Domande</a>
        </form>
    </div>
</div>