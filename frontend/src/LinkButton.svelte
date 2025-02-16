<script>
    export let text;
</script>

<li>
    <button on:click class="dropbtn">{text}</button>
</li>

<style>
    /* Dropdown Button */
    .dropbtn {
        padding: 16px;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    /* Dropdown button on hover & focus */
    .dropbtn:hover,
    button {
        width: 100%;
    }
</style>
