<script>
    import Icon from "@iconify/svelte";
    import { enhance } from "$app/forms";

    let { form } = $props();

    let validate = $state(false);
    const handleSubmit = ({ cancel, formElement }) => {
        validate = true;

        if (!formElement.checkValidity()) {
            cancel();
            return;
        }

        return async ({ update }) => {
            await update();
            validate = false;
        }
    };
</script>

<div class="card border-orange border-5 shadow mx-3" style="width: 450px;">
    <div class="card-header border-orange border-5">
        <h2 class="card-title fw-bold d-flex justify-content-center align-items-center gap-1 m-0">
            <Icon icon="bxs:box" width="32" height="32" />
            TriniBox
        </h2>
    </div>
    <div class="card-body">
        <p class="card-text text-secondary mb-3">
            <small>
                Hai dubbi o curiosità sulla religione cattolica?
                Fai una domanda e ti risponderemo nel podcast!
            </small>
        </p>
        <form class:was-validated={validate} method="POST" use:enhance={handleSubmit} novalidate>
            <div>
                <label for="nome">Nome <em class="text-secondary"><small>- Opzionale</small></em></label>
                <input type="text" name="nome" class="form-control" placeholder="Inserisci il tuo nome">
            </div>
            <div class="my-3">
                <label for="domanda">Domanda</label>
                <textarea name="domanda" class="form-control" rows="3" placeholder="Scrivi qui la tua domanda..." required></textarea>
                <div class="invalid-feedback">
                    Per favore scrivi una domanda.
                </div>
            </div>
            <button type="submit" class="btn btn-orange w-100">Invia Domanda</button>
        </form>
    </div>
</div>