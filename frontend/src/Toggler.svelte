<script>
    let checked = false;
    export let title;
    export let callback;
</script>

<p>{title}</p>
<label class="switch">
    <input type="checkbox" bind:checked={checked} onclick={callback(checked)}/>
    <span class="slider"></span>
</label>


<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 25px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 50px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 17px;
        width: 17px;
        border-radius: 50px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #4caf50;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }
</style>
