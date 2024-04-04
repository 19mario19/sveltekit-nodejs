<script lang="ts">
  import type { PageData } from "./$types"
  import Post from "$lib/components/posts/Post.svelte"
  export let data: PageData
  import Container from "$lib/components/shared/Container.svelte"
  import { ContainerDimension } from "$lib/types"
</script>

<Container dimentions={ContainerDimension.Small}>
  <div class="main">
    <div class="posts">
      {#each data.blogPosts as post}
        <Post {post} />
      {/each}
    </div>
  </div>
</Container>

<style>
  .main {
    display: flex;
    flex-direction: column;
    & .posts {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
      margin: 2rem 0;
    }
  }

  
</style>
