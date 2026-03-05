<script>
    let isLogin = true
</script>
<svelte:head>
	<title>TriniTalk - Login</title>
</svelte:head>

<div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-10 col-sm-6 col-md-4 col-lg-3">
        <div class="text-white d-flex flex-column align-items-center mb-3">
            <h2 class="m-0">Trini<span class="text-custom">Talk</span></h2>
            <p class="fw-light m-0">{isLogin ? 'Bentornato!' : 'Crea il tuo account'}</p>
        </div>
        <form class="text-white">
            <div class="row gy-2">
                {#if !isLogin}
                <div class="col-12">
                    <label for="name" class="form-label m-0 mb-1">Nome</label>
                    <input type="text" class="form-control login-input" name="name" placeholder="Il tuo nome"/>
                </div>
                {/if}
                <div class="col-12">
                    <label for="email" class="form-label m-0 mb-1">Email</label>
                    <input type="email" class="form-control login-input" name="email" placeholder="you@example.com"/>
                </div>
                <div class="col-12">
                    <label for="password" class="form-label m-0 mb-1">Password</label>
                    <input type="password" class="form-control login-input" name="password" placeholder="••••••••"/>
                </div>
                <div class="col-12 mt-3">
                    <button type="submit" class="btn btn-custom w-100">{isLogin ? 'Accedi' : 'Crea account'}</button>
                </div>
            </div>
        </form>
        <p class="text-white text-center fw-light mt-4">
            {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
            <a href="/login" class="text-custom-2" on:click={() => isLogin = !isLogin}>{isLogin ? 'Registrati' : 'Accedi'}</a>
        </p>
    </div>
</div>