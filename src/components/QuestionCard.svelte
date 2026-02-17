<script>
    let { item } = $props();

    function displayDate(date) {
        const TODAY = new Date().getDate();
        const MONTH = new Date().getMonth()
        
        if (MONTH != date.slice(3, 5) - 1) return date;

        const DIFFERENCE = TODAY - date.slice(0, 2);
        if (DIFFERENCE >= 7 && DIFFERENCE < 14) {
            return "Una settimana fa";
        } else if (DIFFERENCE == 0) {
            return "Oggi"
        } else if (DIFFERENCE < 7) {
            return DIFFERENCE + " giorni fa";
        } else {
            return date;
        }
    }
</script>

<div class="card shadow-sm h-100">
    <div class="card-body">
        <h5 class="card-title m-0">{item.nome}</h5>
        <p class="text-secondary mb-2"><small>{displayDate(new Date(item.created_at).toLocaleDateString())}</small></p>
        <p class="card-text">{item.domanda}</p>
    </div>
</div>