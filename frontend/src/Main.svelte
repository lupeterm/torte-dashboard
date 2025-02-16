<script>
    import { Group, NativeSelect, Button } from "@svelteuidev/core";
    let config = {
        selectedProject: null,
        selectedArch: null,
    };

    let plotName = "";
    let plotOptions = [
        "sloc",
        "features",
        "configuration",
        "share",
        "feature",
        "total",
        "features",
        "model",
        "model",
        "architectures",
        "model",
        "features",
    ];

    const getPlot = (config) => {
        console.log(config);
        console.log(JSON.stringify({ graph: config }));
        fetch(`/graph?graph=${config.replace(" ", "-")}`)
            .then((response) => {
                // When the page is loaded convert it to text
                return response.text();
            })
            .then((data) => {
                console.log(data);

                var iframe = document.getElementById("plot");
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(data);
                iframe.contentWindow.document.close();
                plotName = config;
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
        bind:value={config.endCommit}
    ></NativeSelect>
    <Button on:click={() => getPlot("Linux-Sloc")} ripple>
        Go!
        <img src="svgs/rocket.svg" alt="My Happy SVG" />
    </Button>
</Group>
<h2 hidden={plotName == ""}>Plot: {plotName}</h2>
<div class="plotContainer">
    <iframe
        title="Plot"
        hidden={plotName == ""}
        id="plot"
        style="height:50%;width:80%;border:none;display:block"
    ></iframe>
</div>

<style>
    .plotContainer {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
