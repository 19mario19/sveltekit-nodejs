<script lang="ts">
  import type { LayoutData } from "./$types"
  import "../app.css"
  import Navbar from "$lib/components/Navbar.svelte"
  export let data: LayoutData

  import { page } from "$app/stores"

  $: console.log(data.user)
  $: console.log($page.url.pathname)
</script>

<Navbar />
<div class="container">
  <p>{$page.url.pathname === "/" ? "/home" : $page.url.pathname}</p>
</div>

<slot />

<style>
  .container {
    padding:1rem ;
  }
</style>
