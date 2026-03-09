<script>
    import Icon from "@iconify/svelte";
    import { enhance } from "$app/forms";
    import { useValidation, useAuth } from "../lib/utils.svelte.js";

    let { form } = $props();

    const validator = useValidation();
    const auth = useAuth();
    let userName = $state("");
    let lastUserId = $state(null);

    $effect(() => {
        const user = auth.user;
        if (user) {
            if (user.id !== lastUserId) {
                userName = user.user_metadata?.name ?? "";
                lastUserId = user.id;
            }
        } else {
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
            Fai una question e ti risponderemo nel podcast!
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