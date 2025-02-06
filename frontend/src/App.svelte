<script>
  import { Group, Loader, Center, NativeSelect } from "@svelteuidev/core";
	import { DateInput } from 'date-picker-svelte'
  import { onMount } from "svelte";
  import DateRangeSelection from "./DateRangeSelection.svelte";
  import CommitRangeSelection from "./CommitRangeSelection.svelte";
  import Toggler from "./Toggler.svelte";
  let plotName = "";
  let architectures = [];
  let projects = [];
  let loading = true;
  let error = null;
  let selectDateRange = true;
  let config = {
    startDate: new Date(),
    endDate: new Date(),
    startCommit: null,
    endCommit: null,
    selectedProject: null,
    selectedArch: null,
  };
  let commits = [];
  onMount(async () => {
    try {
      const response = await fetch("/architectures");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      architectures = data["architectures"];
      projects = data["projects"];
      loading = false;
    } catch (err) {
      console.log(err);
      error = err;
      loading = false;
    }
  });

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
  const getCommits = (config) => {
    console.log(config);
    console.log(JSON.stringify({ graph: config }));
    let url = `/commmits?project=${config.selectedProject}`
    if (config.selectedProject == "linux"){
      url += `&arch=${config.selectedArch}`
    }
    fetch("/commits")
      .then((response) => {
        // When the page is loaded convert it to text
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        commits = data["commits"];
      })
      .catch((error) => {
        console.error("Failed to fetch page: ", error);
      });
  };
</script>

<h1>Hi!</h1>
<Center>
  {#if loading}
    <p>Loading...</p>
    <Loader variant="dots" />
  {:else if error}
    <p>Error: {error.message}</p>
  {:else}
    <Group position="center" spacing="xl">
      <NativeSelect
        data={projects}
        placeholder="Project"
        variant="filled"
        radius="md"
        size="md"
        bind:value={config.selectedProject}
      ></NativeSelect>
      {#if config.selectedProject == "linux"}
        <NativeSelect
          data={architectures}
          placeholder={"Architecture"}
          variant="filled"
          radius="md"
          size="md"
          bind:value={config.selectedArch}
        ></NativeSelect>
      {/if}
      <Toggler
        title={selectDateRange ? "Select Commits" : "Select Dates"}
        callback={(checkValue) => {
          if (checkValue && config.selectedProject) {
            getCommits(config);
          }
          selectDateRange = checkValue;
        }}
      ></Toggler>
      {#if selectDateRange}
        <input type="date" bind:value={config.startDate}/>
        <input type="date" bind:value={config.endDate} />
      {:else}
        <CommitRangeSelection></CommitRangeSelection>
      {/if}
      <button
        on:click={() => {
          alert(JSON.stringify(config));
        }}>Go!</button
      >
    </Group>

    <section>
      <h2 hidden={plotName == ""}>Plot: {plotName}</h2>
      <iframe
        title="Plot"
        hidden={plotName == ""}
        id="plot"
        style="height:80vh;width:90vh; border:none"
      ></iframe>
    </section>
  {/if}
</Center>
