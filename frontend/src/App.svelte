<script>
  import {
    Group,
    Loader,
    NativeSelect,
    Tooltip,
    Button,
    colorScheme,
    SvelteUIProvider,
    Stack,
    Text,
    ActionIcon,
  } from "@svelteuidev/core";
  import { onMount } from "svelte";
  import CommitRangeSelection from "./CommitRangeSelection.svelte";
  import Toggler from "./Toggler.svelte";
  let plotName = "";
  let architectures = [];
  let projects = [];
  let loading = true;
  let error = null;
  let selectDateRange = true;
  let config = {
    startDate: null,
    endDate: null,
    startCommit: null,
    endCommit: null,
    selectedProject: null,
    selectedArch: null,
  };
  let mode = "dark"
  let commits = [];
  function toggleTheme() {
    colorScheme.update((v) => (v === "light" ? "dark" : "light"));
    mode = (mode === "light" ? "dark" : "light");
  }
  onMount(async () => {
    try {
      colorScheme.update((v) => "dark");
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
    let url = `/commmits?project=${config.selectedProject}`;
    if (config.selectedProject == "linux") {
      url += `&arch=${config.selectedArch}`;
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

<SvelteUIProvider withGlobalStyles themeObserver={colorScheme}
></SvelteUIProvider>
<Group>
  <h1>Hi!</h1>
  <Button on:click={toggleTheme}>
    {#if mode === "dark"}
    <img src = "svgs/dark_mode.svg" alt=""/>
    {:else}
    <img src = "svgs/light_mode.svg" alt=""/>
    {/if}
  </Button>
</Group>
<!-- <Center> -->
{#if loading}
  <p>Loading...</p>
  <Loader variant="dots" />
{:else if error}
  <p>Error: {error.message}</p>
{:else}
  <!-- <Flex justify="space-around"> -->
  <Group position="center" spacing="xl">
    <NativeSelect
      data={projects}
      placeholder="Project"
      variant="filled"
      radius="md"
      size="md"
      bind:value={config.selectedProject}
    ></NativeSelect>
    <Tooltip
      label="Only available for linux"
      disabled={config.selectedProject == "linux"}
    >
      <NativeSelect
        data={architectures}
        placeholder={"Architecture"}
        variant="filled"
        radius="md"
        size="md"
        bind:value={config.selectedArch}
        disabled={config.selectedProject != "linux"}
      ></NativeSelect>
    </Tooltip>
    <Toggler
      title={selectDateRange ? "Select Commits" : "Select Dates"}
      callback={(checkValue) => {
        if (checkValue && config.selectedProject) {
          getCommits(config);
        }
        selectDateRange = checkValue;
      }}
    ></Toggler>
    {#if !selectDateRange}
      <input type="date" bind:value={config.startDate} />
      <input type="date" bind:value={config.endDate} />
    {:else}
      <NativeSelect
        data={commits.toReversed()}
        placeholder={"Start Commit"}
        variant="filled"
        radius="md"
        size="md"
        bind:value={config.startCommit}
      ></NativeSelect>
      <NativeSelect
        data={commits
          .filter(
            (commit) =>
              commits.indexOf(commit) > commits.indexOf(config.startCommit),
          )
          .toReversed()}
        placeholder={"End Commit"}
        variant="filled"
        radius="md"
        size="md"
        bind:value={config.endCommit}
      ></NativeSelect>
    {/if}
    <Button on:click={() => getPlot("Linux-Sloc")} ripple>
      Go!
      <img src = "svgs/rocket.svg" alt="My Happy SVG"/>
      <!-- <span class="material-symbols-outlined">
        rocket_launch
        </span> -->
    </Button>
  </Group>
{/if}
<!-- </Center> -->
<!-- <section style="width:100%;height:100%"> -->
<!-- <Flex justify="center" direction="column"> -->
<h2 hidden={plotName == ""}>Plot: {plotName}</h2>
<div class="plotContainer">
  <iframe
    title="Plot"
    hidden={plotName == ""}
    id="plot"
    style="height:50%;width:80%;border:none;display:block"
  ></iframe>
</div>

<!-- </section> -->

<style>
  .plotContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>
