<script>
    import { supabase } from '$lib/supabaseClient';
    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    import logo from "$lib/assets/trinitalk-word-logo.png";

    // Variabili di stato
    let user = $state(null);
    let username = $state('');
    let email = $state('');
    let password = $state(''); // La lasciamo vuota di default
    
    let isLoading = $state(false);
    let message = $state({ type: '', text: '' }); // Per mostrare successi o errori

    // Al caricamento, controlliamo se l'utente è loggato
    $effect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                // Se non è loggato, lo cacciamo alla pagina di login
                goto('/login');
            } else {
                user = data.session.user;
                // Pre-compiliamo i campi con i dati attuali
                username = user.user_metadata?.username || '';
                email = user.email || '';
            }
        });
    });

    async function handleUpdate() {
        isLoading = true;
        message = { type: '', text: '' };

        let updates = {};

        // Aggiunto un controllo più sicuro per evitare che "undefined" crei problemi
        if (username !== (user.user_metadata?.username || '')) {
            updates.data = { username: username }; 
        }
        if (email !== user.email) {
            updates.email = email;
        }
        if (password.trim() !== '') {
            updates.password = password;
        }

        if (Object.keys(updates).length === 0) {
            message = { type: 'info', text: 'Nessuna modifica da salvare.' };
            isLoading = false;
            return;
        }

        // Chiamata API
        const { data, error } = await supabase.auth.updateUser(updates);

        if (error) {
            message = { type: 'error', text: "Errore durante l'aggiornamento: " + error.message };
        } else {
            // IL TRUCCO MAGICO: Forziamo il browser a scaricare i dati freschi!
            await supabase.auth.refreshSession();
            
            message = { type: 'success', text: 'Profilo aggiornato con successo!' };
            password = ''; 
            user = data.user; 
            
            // Riapplichiamo il nome per essere sicuri al 100% che l'input si aggiorni
            username = user.user_metadata?.username || ''; 
        }

        isLoading = false;
    }
</script>

<svelte:head>
	<title>TriniTalk - Profilo</title>
</svelte:head>

<div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-10 col-sm-6 col-md-4 col-lg-3">
        <div class="text-white d-flex flex-column align-items-center mb-3">
            <a href="/"><img src={logo} alt="TriniTalk Logo" style="width: 150px;"></a>
            <p class="fw-light m-0 mt-1">Impostazioni Profilo</p>
        </div>

        {#if message.text}
            <div class="alert alert-{message.type === 'error' ? 'danger' : message.type === 'success' ? 'success' : 'info'} p-2 gap-1 text-center d-flex justify-content-center align-items-center mt-0">
                {#if message.type === 'error'}
                    <Icon icon="mingcute:alert-fill" width="20" height="20" />
                {:else if message.type === 'success'}
                    <Icon icon="mingcute:check-circle-fill" width="20" height="20" />
                {:else}
                    <Icon icon="mingcute:information-fill" width="20" height="20" />
                {/if}
                {message.text}
            </div>
        {/if}

        <form onsubmit={(e) => { e.preventDefault(); handleUpdate(); }} class="text-white" novalidate>
            <div class="row gy-2">
                <div class="col-12">
                    <label for="username" class="form-label m-0 mb-1">Nome</label>
                    <input type="text" id="username" class="form-control login-input" bind:value={username} placeholder="Il tuo nome"/>
                </div>
                <div class="col-12">
                    <label for="email" class="form-label m-0 mb-1">Email</label>
                    <input type="email" id="email" class="form-control login-input" bind:value={email} required placeholder="tua@email.com"/>
                </div>
                <div class="col-12">
                    <label for="password" class="form-label m-0 mb-1">Password</label>
                    <input type="password" id="password" class="form-control login-input" bind:value={password} placeholder="Lascia vuoto per non modificare"/>
                    <div class="form-text text-white-50 mt-1" style="font-size: 0.85rem;">Lascia il campo vuoto se vuoi mantenere la password attuale.</div>
                </div>
                <div class="col-12 mt-3">
                    <button type="submit" class="btn btn-custom w-100" disabled={isLoading}>
                        {#if isLoading}
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        {:else}
                            Salva Modifiche
                        {/if}
                    </button>
                </div>
            </div>
        </form>
        
        <p class="text-white text-center fw-light mt-4">
            Torna alle <a href="/questions" class="text-custom-2">Domande</a>
        </p>
    </div>
</div>