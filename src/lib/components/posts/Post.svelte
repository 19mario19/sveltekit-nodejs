<script lang="ts">
  import type { BlogPost } from "$lib/types"

  export let post: BlogPost
</script>

<a href="/posts/{post._id}">
  <div class="post">
    <div class="top">
      <h3>{post.title}</h3>
      <p>{post.subtitle}</p>
    </div>
    <div class="bottom">
      <img src={post.mainImage} alt={post.title} />
      {#if post.createdAt}
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      {/if}
    </div>
  </div>
</a>

<style>
  .post {
    /* display: flex;
    flex-direction: column; */
    display: grid;
    grid-template-rows: 180px 4fr;
    gap: 1rem;
    width: 400px;
    padding: 2rem;
    transition: var(--slow);
    border-radius: 15px;
    text-align: center;

    border: 1px solid var(--l-35);

    & .top {
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap: 1rem;

      & p {
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Limit the number of lines to 2 */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 3rem; /* Adjust based on line height and number of lines */
      }
    }

    & .bottom img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 15px;
      transform-origin: center;

      transition: var(--slow);

      &:hover {
        border-radius: 5px;
        filter: blur(0);
      }
    }
    &:hover {
      background-color: var(--l-35);
    }
  }
</style>
