<script>
    import { setupProfileIcon, profileIconColor } from "../lib/utils.svelte.js";
    let { name } = $props();

    // Colour derived from the name, so it stays the same across visits
    let bgColor = $derived(profileIconColor(name));
</script>

<div
    class="rounded-circle d-flex justify-content-center align-items-center text-white shadow-sm flex-shrink-0"
    style="width: 45px; height: 45px; background-color: {bgColor};"
    title={name}
    role="img"
    aria-label={name}
>
    <span class="fw-bold">{setupProfileIcon(name)}</span>
</div>
