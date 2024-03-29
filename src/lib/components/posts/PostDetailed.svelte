<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import type { BlogPost } from "$lib/types"
  import { recordAuthors } from "$lib/authorsDb"
  import { PersonName } from "$lib/types"
  import Author from "../author/Author.svelte"

  export let post: BlogPost

  let author = recordAuthors[post.author.name || PersonName.DenaliBella]

  async function remove() {
    try {
      let res = await fetch("/api/blog-posts/" + post._id, {
        method: "DELETE",
      })
      if (res.ok) {
        invalidateAll()
      }
    } catch (error) {
      console.log((error as Error).message)
    } finally {
      console.log("Remvoved!")
    }
  }
</script>

<div class="container">
  <div class="post">
    <div class="top">
      <div class="content">
        <div class="layout" />
        <h1>{post.title}</h1>
        <h3>{post.subtitle}</h3>
      </div>
      <img src={post.mainImage} alt={post.title} />
    </div>
    <div class="bottom">
      <Author {author} />
      <div class="content">
        <pre>{JSON.stringify(post.content, null, 2)}</pre>
      </div>
    </div>
  </div>
  <a href="/posts/">
    <button class="remove" on:click={remove}>Remove</button>
  </a>
</div>

<style>
  .container {
    margin: 0 auto;
  }

  .post {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin: 2rem 0;

    overflow: hidden;
    z-index: 1;

    & .top {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;
      position: relative;
      color: white;

      & .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        gap: 1rem;

        position: absolute;
        inset: 0;

        /* bottom: 50%;
        right: 50%;
        
        transform: translateX(50%) translateY(50%); */

        padding: 3rem;
        z-index: 1;

        & h1,
        h3 {
          color: white;
          max-width: 500px;
          text-shadow: var(--bs-lg);
        }

        & .layout {
          position: absolute;
          opacity: 0.3;
          border-radius: 5px;
          inset: 0;
          width: 100%;
          height: 100%;
          background-color: var(--p-50);
          z-index: -1;
          overflow: hidden;
        }
      }

      & img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        z-index: 0;
        border-radius: 5px;
      }
    }
    & .bottom {
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: flex-start;
      gap: 4rem;
    }
  }
</style>
