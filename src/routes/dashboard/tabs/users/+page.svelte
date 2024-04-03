<script lang="ts">
  import type { PageData } from "./$types"
  import Users from "$lib/components/dashboard/tabs/Users.svelte"
  export let data: PageData
</script>

{#if data.users}
  <Users users={data.users} />
{/if}
