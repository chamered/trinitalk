<script>
    import Icon from "@iconify/svelte";
    import { supabase } from "$lib/supabaseClient";
    import { goto } from "$app/navigation";
    import { useValidation } from "$lib/utils.svelte.js";
    import logo from "$lib/assets/trinitalk-word-logo.png"; 

    const validator = useValidation();
    
    let isLogin = $state(true); // true = login, false = registration

    // Form data
    let email = $state("");
    let password = $state("");
    let name = $state("");

    // Error handling
    let errorMessage = $state("");
    let isLoading = $state(false);
    
    async function handleSubmit(event) {
        event.preventDefault();
        // Client-side validation
        if (!validator.clientSubmit(event.target)) {
            return;
        }

        isLoading = true;
        errorMessage = "";

        if (isLogin) {
            // LOGIN AUTH
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) {
                errorMessage = "Email o password errati.";
            } else {
                goto("/questions"); // If login is successful, redirect to questions page
            }
        } else {
            // REGISTRATION NEW USER
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    // Save name in the "extra data" of supabase
                    data: { name: name }
                }
            });

            if (error) {
                errorMessage = error.message; // Show error message
            } else {
                goto("/questions"); // If registration is successful, redirect to questions page
            }
        }

        isLoading = false;
    }
</script>
<svelte:head>
	<title>TriniTalk - {isLogin ? 'Accedi' : 'Registrati'}</title>
</svelte:head>

<div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-10 col-sm-6 col-md-4 col-lg-3">
        <div class="text-white d-flex flex-column align-items-center mb-3">
            <a href="/"><img src={logo} alt="TriniTalk Logo" style="width: 150px;"></a>
            <p class="fw-light m-0 mt-1">{isLogin ? 'Bentornato!' : 'Crea il tuo account'}</p>
        </div>

        {#if errorMessage}
            <div class="alert alert-danger p-2 gap-1 text-center d-flex justify-content-center align-items-center mt-0">
                <Icon icon="mingcute:alert-fill" width="20" height="20" />
                {errorMessage}
            </div>
        {/if}

        <form
            onsubmit={handleSubmit}
            oninput={() => validator.reset()}
            class:was-validated={validator.isActive}
            class="text-white"
            novalidate
        >
            <div class="row gy-2">
                {#if !isLogin}
                <div class="col-12">
                    <label for="name" class="form-label m-0 mb-1">Nome</label>
                    <input type="text" id="name" class="form-control login-input" bind:value={name} required={!isLogin} placeholder="Il tuo nome"/>
                    <div class="invalid-feedback">
                        Perfavore inserisci il tuo nome.
                    </div>
                </div>
                {/if}
                <div class="col-12">
                    <label for="email" class="form-label m-0 mb-1">Email</label>
                    <input type="email" id="email" class="form-control login-input" bind:value={email} required placeholder="tua@email.com"/>
                    <div class="invalid-feedback">
                        Perfavore inserisci un'email valida.
                    </div>
                </div>
                <div class="col-12">
                    <label for="password" class="form-label m-0 mb-1">Password</label>
                    <input type="password" id="password" class="form-control login-input" bind:value={password} required minlength="8" placeholder="••••••••"/>
                    <div class="invalid-feedback">
                        Perfavore inserisci una password di almeno 8 caratteri.
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <button type="submit" class="btn btn-custom w-100" disabled={isLoading}>
                        {#if isLoading}
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {:else}
                            {isLogin ? 'Accedi' : 'Crea account'}
                        {/if}
                    </button>
                </div>
            </div>
        </form>
        <p class="text-white text-center fw-light mt-4">
            {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
            <a href="/login" class="text-custom-2" onclick={(e) => { e.preventDefault(); isLogin = !isLogin; errorMessage = ""; }}>{isLogin ? 'Registrati' : 'Accedi'}</a>
        </p>
    </div>
</div>