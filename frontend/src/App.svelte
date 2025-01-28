<script>
  import Link from "./Link.svelte";
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import LinkButton from "./LinkButton.svelte";
  let menuOpen = false;

  let plotName = "";

  const menuItems = [
    "Linux Sloc",
    "Jaccard Features",
    "Configuration Similarity",
    "Total Features",
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

<h1>Hi!</h1>
<section class="dropdown">
  <Button on:click={() => (menuOpen = !menuOpen)} {menuOpen} />

  <div id="myDropdown" class:show={menuOpen} class="dropdown-content">
    <!-- MENU -->
    {#each menuItems as item}
      <LinkButton
        text={item}
        on:click={() => {
          getPlot(item);
          menuOpen = !menuOpen;
        }}
      ></LinkButton>
    {/each}
  </div>
</section>

<section>
  <h2 hidden={plotName == ""}>Plot: {plotName}</h2>
  <iframe
    hidden={plotName == ""}
    id="plot"
    style="height:80vh;width:90vh; border:none"
  ></iframe>
</section>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f6f6f6;
    min-width: 230px;
    border: 1px solid #ddd;
    z-index: 1;
  }

  /* Show the dropdown menu */
  .show {
    display: block;
  }
</style>
