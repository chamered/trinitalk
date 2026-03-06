<script>
    import UserMenu from "./UserMenu.svelte";
</script>

<nav class="navbar navbar-expand-lg bg-custom border-bottom border-custom-2 border-2">
    <div class="container-fluid">
        <a href="/" class="navbar-brand d-flex align-items-center">
            <img src="src/lib/assets/trinitalk-word-logo.png" alt="Trinitalk" width="100">
        </a>
        <ul class="navbar-nav">
            <li class="nav-item">
                <UserMenu />
            </li>
        </ul>
    </div>
</nav>