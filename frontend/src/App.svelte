<script>
  import Link from "./Link.svelte";
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import LinkButton from "./LinkButton.svelte";
  let menuOpen = false;
  let inputValue = "";

  const menuItems = ["selection"];
  let filteredItems = [];

  const handleInput = () => {
    return (filteredItems = menuItems.filter((item) =>
      item.toLowerCase().match(inputValue.toLowerCase()),
    ));
  };

  const getPlot = () => {
    fetch("/graph")
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
    <LinkButton
      text="Mock Selection"
      on:click={() => {
        getPlot();
        menuOpen = !menuOpen
      }}
    ></LinkButton>
    <Input bind:inputValue on:input={handleInput} />
    <!-- MENU -->
    {#if filteredItems.length > 0}
      {#each filteredItems as item}
        <Link link={item} />
      {/each}
    {:else}
      {#each menuItems as item}
        <Link link={item} />
      {/each}
    {/if}
  </div>
</section>

<section>
  <h2>Plot:</h2>
  <iframe id="plot" style="height:80vh;width:90vh; border:none"></iframe>
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
