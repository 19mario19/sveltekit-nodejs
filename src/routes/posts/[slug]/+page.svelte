<script lang="ts">
  import type { PageData } from "./$types"
  import PostDetailed from "$lib/components/posts/PostDetailed.svelte"
  export let data: PageData
</script>

<PostDetailed post={data.blogPost} />
