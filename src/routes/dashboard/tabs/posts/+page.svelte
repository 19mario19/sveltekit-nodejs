<script lang="ts">
  import Posts from "$lib/components/dashboard/tabs/Posts.svelte"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

{#if data.posts}
  <Posts posts={data.posts} />
{/if}
