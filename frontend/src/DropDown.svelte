<script>
    import Button from "./Button.svelte";
    import LinkButton from "./LinkButton.svelte";
    let menuOpen = false;
    export let title;
    export let menuItems;
    export let onClickFunc;
    console.log(menuItems);
</script>

<section class="dropdown">
    <Button
        text={title}
        on:click={() => {
            menuOpen = !menuOpen;
        }}
        {menuOpen}
    />
    <div class:show={menuOpen} class="dropdown-content">
        {#each menuItems as item}
            <LinkButton
                text={item}
                on:click={() => {
                    onClickFunc(item);
                    menuOpen = !menuOpen;
                }}
            ></LinkButton>
        {/each}
    </div>
</section>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
        width: 150px;
    }

    
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f6f6f6;
        min-width: 150px;
        border: 1px solid #ddd;
        z-index: 1;
        overflow: hidden;
        overflow-y: scroll;
        height: 400px;
    }

    /* Show the dropdown menu */
    .show {
        display: block;
    }
</style>
