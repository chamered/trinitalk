<script lang="ts">
    import Icon from "@iconify/svelte";
    import ProfileIcon from "./ProfileIcon.svelte";

    let { item, currentUser, isPending = false, onToggleUpvote } = $props();

    // Determine if the current user has upvoted this specific question
    let hasUpvoted = $derived(currentUser && item.upvotes?.some((v: any) => v.user_id === currentUser.id));

    let isAnimating = $state(false);

    // Reference time for relative dates, refreshed every minute so the
    // timestamps don't go stale while the page stays open.
    let now = $state(new Date());

    $effect(() => {
        const interval = setInterval(() => {
            now = new Date();
        }, 60_000);

        return () => clearInterval(interval);
    });

    function handleUpvote() {
        if (isPending) return;

        onToggleUpvote();
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }
    
    // Types for date formatting
    type Unit = {
        limit: number;
        seconds: number;
        singular: SingularDateType;
        plural: PluralDateType;
    }
    type SingularDateType = "secondo" | "minuto" | "ora" | "giorno";
    type PluralDateType = "secondi" | "minuti" | "ore" | "giorni";

    /**
     * Calculates and formats the time elapsed since the question was created.
     * Returns a relative time string for recent dates, or an absolute localized 
     * date string for older questions.
     * 
     * @param {string | number | Date} date - The creation date of the question.
     * @param {Date} reference - The moment to compare against, so the value
     *                            re-evaluates when the timer ticks.
     * @returns {string} The formatted relative or absolute date string.
     */
    function formatDate(date: string | number | Date, reference: Date): string {
        const creationDate = new Date(date);

        const diffSeconds = Math.floor(
            (reference.getTime() - creationDate.getTime()) / 1_000
        );
        if (diffSeconds < 60) return "Pochi secondi fa";

        const units: Unit[] = [
            { limit: 60, seconds: 60, singular: "minuto", plural: "minuti" },
            { limit: 24, seconds: 3_600, singular: "ora", plural: "ore" },
            { limit: 7, seconds: 86_400, singular: "giorno", plural: "giorni" }
        ]

        for (const unit of units) {
            const value = Math.floor(diffSeconds / unit.seconds);

            if (value < unit.limit) {
                return `${value} ${pluralize(value, unit.singular, unit.plural)} fa`;
            }
        }
        return creationDate.toLocaleDateString("it-IT");
    }

    /**
     * Pluralizes a given time unit string based on its value.
     * 
     * @param {number} value - The numerical value determining pluralization.
     * @param {SingularDateType} singular - The singular form of the word.
     * @param {PluralDateType} plural - The plural form of the word.
     * @returns {SingularDateType | PluralDateType} The correct word form.
     */
    function pluralize(
        value: number,
        singular: SingularDateType,
        plural: PluralDateType
    ): SingularDateType | PluralDateType {
        return value === 1 ? singular : plural;
    }
</script>

<div class="card text-bg-dark border-custom shadow-lg h-100">
    <div class="card-body">
        <div class="d-flex align-items-center gap-2 mb-2">
            <ProfileIcon name={item.name}/>
            <div class="d-flex flex-column">
                <h6 class="card-title m-0">{item.name}</h6>
                <small class="text-secondary" title={new Date(item.created_at).toLocaleString('it-IT')}>
                    {formatDate(item.created_at, now)}
                </small>
            </div>
        </div>
        <p class="card-text fw-light m-0 mb-3 text-break">{item.question}</p>
        {#if item.episode_url}
            <div class="d-flex align-items-start gap-1 m-0 ms-2">
                <Icon class="mt-1 flex-shrink-0" icon="mdi:play-circle" width="18" height="18" />
                <p class="fw-light m-0 text-break">
                    Trovi la risposta a questa domanda <a class="text-custom text-decoration-none text-nowrap" href={item.episode_url}>&rarr; QUI &larr;</a>
                </p>
            </div>
        {/if}
        {#if !item.episode_url}
            <button 
                class="btn btn-outline-custom rounded-pill fw-bold d-flex justify-content-center align-items-center gap-1 {isAnimating ? 'animate-pop' : ''}"
                style="min-width: 60px;"
                aria-pressed={hasUpvoted}
                aria-label="Mi piace questa domanda"
                disabled={isPending}
                onclick={handleUpvote}>
                <Icon class="me-1" icon={hasUpvoted ? 'iconamoon:like-fill' : 'iconamoon:like'} width="18" height="18" />
                {item.upvotes?.length || 0}
            </button>
        {/if}
    </div>
</div>

<style>
    @keyframes pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    :global(.animate-pop) {
        animation: pop 0.3s ease-in-out;
    }
</style>