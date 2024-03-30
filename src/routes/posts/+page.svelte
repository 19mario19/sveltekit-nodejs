<script lang="ts">
  import type { PageData } from "./$types"
  import Post from "$lib/components/posts/Post.svelte"
  export let data: PageData
  import Container from "$lib/components/shared/Container.svelte"
  import { ContainerDimension } from "$lib/types"
</script>

<Container>
  <div class="wrapper">
    <h1>Here are the latest posts</h1>
    <div class="posts">
      {#each data.blogPosts as post}
        <Post {post} />
      {/each}
    </div>
  </div>
</Container>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    & .posts {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      margin: 2rem 0;
    }
  }

  h1 {
    padding: 2rem;
    border-bottom: 1px solid var(--p);
    font-family: var(--font-t);
    text-align: center;
  }
</style>
