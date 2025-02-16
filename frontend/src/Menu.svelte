<script>
    import { Button, colorScheme, SvelteUIProvider } from "@svelteuidev/core";
    let mode = "dark";
    function toggleTheme() {
        colorScheme.update((v) => (v === "light" ? "dark" : "light"));
        mode = mode === "light" ? "dark" : "light";
    }
</script>

<nav class="hidden text-gray-500 uppercase text-bold sm:block">
    <Button on:click={toggleTheme}>
        {#if mode === "dark"}
            <img src="svgs/dark_mode.svg" alt="" />
        {:else}
            <img src="svgs/light_mode.svg" alt="" />
        {/if}
    </Button>
</nav>
