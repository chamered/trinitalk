<script>
    import UserMenu from "./UserMenu.svelte";
    import logo from "$lib/assets/trinitalk-word-logo.png";

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-custom border-bottom border-custom-2 border-2">
    <div class="container-fluid">
        <a href="/" class="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Trinitalk" width="100">
        </a>

        <!--
        <button class="navbar-toggler ms-auto" type="button" on:click={toggleMenu} aria-expanded={isMenuOpen} aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        -->

        <div class="collapse navbar-collapse position-relative w-100" class:show={isMenuOpen}>
            <!--
            <ul class="navbar-nav w-100 d-flex justify-content-lg-center justify-content-end text-end mt-3 mt-lg-0">
                <li class="nav-item">
                    <a class="nav-link text-white px-3" href="/trinibox" on:click={() => isMenuOpen = false}>TriniBox</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white px-3" href="/about" on:click={() => isMenuOpen = false}>About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white px-3" href="/questions" on:click={() => isMenuOpen = false}>All Questions</a>
                </li>
            </ul>
            -->
        </div>
        <div class="d-flex justify-content-end align-items-center ms-auto">
            <UserMenu onclick={() => isMenuOpen = false} />
        </div>
    </div>
</nav>