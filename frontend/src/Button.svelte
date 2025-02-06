<script>
    export let text;
</script>

<button on:click class="dropbtn">
    <span>{text}</span>
    <span class="material-symbols-outlined"> arrow_drop_down </span>
</button>

<style>
    /* Dropdown Button */
    .dropbtn {
        background-color: darkblue;
        color: white;
        padding: 16px;
        padding-right: 8px;
        padding-left: 8px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        width: 100%;
    }
    .material-symbols-outlined {
        float: right;
    }

    /* Dropdown button on hover & focus */
    .dropbtn:hover,
    .dropbtn:focus {
        background-color: #3e8e41;
    }
    span {
        display: inline-block;
        vertical-align: middle;
        line-height: 18px; /* <-- adjust this */
    }
</style>
