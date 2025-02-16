<script>
    import { Group, NativeSelect, Button, Stack, Center } from "@svelteuidev/core";

    let selectedPlot = null;
    export let plotOptions;
    export let selectedProject;
    const getPlot = () => {
        if (!selectedProject) {
            return;
        }
        const req = JSON.stringify({
            project: selectedProject,
            plot: selectedPlot,
        });
        fetch("/graph", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: req,
        })
            .then((response) => {
                // When the page is loaded convert it to text
                return response.text();
            })
            .then((data) => {
                var iframe = document.getElementById("plot");
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(data);
                iframe.contentWindow.document.close();
            })
            .catch((error) => {
                console.error("Failed to fetch page: ", error);
            });
    };
</script>

<Group position="center" spacing="xl">
    <NativeSelect
        data={plotOptions}
        placeholder={"Data to be drawn"}
        variant="filled"
        radius="md"
        size="md"
        bind:value={selectedPlot}
    ></NativeSelect>
    <Button on:click={() => getPlot("Linux-Sloc")} ripple>
        Go!
        <img src="svgs/rocket.svg" alt="My Happy SVG" />
    </Button>
</Group>
<Stack override={{ height: 300 }} align="center">
    <h2 hidden={selectedPlot == null}>Plot: {selectedPlot}</h2>
    <div class="plotContainer">
    </div>
</Stack>
<Center>
    <iframe
    align="center"
        title="Plot"
        hidden={selectedPlot == ""}
        id="plot"
        style="height:230px;width:760px;border:none;display:block"
    ></iframe>
</Center>
<style>
    .plotContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Full viewport height */
        width: 24vw;
        margin: 0;
    }
</style>
