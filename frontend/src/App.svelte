<script>
  import { colorScheme, SvelteUIProvider, Button } from "@svelteuidev/core";
  import Logo from "./Logo.svelte";
  import Hamburger from "./Hamburger.svelte";
  import Menu from "./Menu.svelte";
  import Main from "./Main.svelte";
  import { onMount } from "svelte";
  let projects = [];

  let open = false;
  function openNav() {
    if (document.getElementById("mySidenav") == null) {
      open = false;
      return;
    }
    if (open) {
      document.getElementById("mySidenav").style.width = "0";
      open = false;
    } else {
      document.getElementById("mySidenav").style.width = "250px";
      open = true;
    }
  }
  onMount(async () => {
    try {
      colorScheme.update((v) => "dark");
      const response = await fetch("/architectures");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      projects = data["projects"];
    } catch (err) {
      console.log(err);
      error = err;
      loading = false;
    }
  });
</script>

<SvelteUIProvider withGlobalStyles themeObserver={colorScheme}>
  <nav class="flex">
    <Hamburger onClickFunc={openNav} />
    <Logo />
  </nav>

  <div id="mySidenav" class="sidenav">
    {#each projects as item}
      <Button
        style="width: 90%;margin:auto;margin-bottom: 5px"
        variant="default"
        ripple
      >
        {item}
      </Button>
    {/each}
  </div>
  <Main />
</SvelteUIProvider>

<style>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
</style>
