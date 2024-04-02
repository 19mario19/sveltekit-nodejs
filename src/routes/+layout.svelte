<script lang="ts">
  import type { LayoutData } from "./$types"
  import "../app.css"
  import Navbar from "$lib/components/Navbar.svelte"
  export let data: LayoutData

  import { page } from "$app/stores"
  import { enhance } from "$app/forms"

  $: console.log(data.user)
</script>

<Navbar />

<div class="container">
  {#if data.user}
    <h1>Hello, {data.user?.name} with role {data.user?.role}</h1>
  {/if}
  <h3>Pathname: {$page.url.pathname}</h3>
</div>

<slot />

<style>
  .container {
    padding: 2rem;
  }
</style>
