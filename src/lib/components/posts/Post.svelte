<script lang="ts">
  import type { BlogPost } from "$lib/types"

  export let post: BlogPost
</script>

<a href="/posts/{post._id}">
  <div class="post">
    <div class="top">
      <p class="category">{post.category}</p>
      <h3>{post.title}</h3>
      <p>{post.subtitle}</p>
      {#if post.createdAt}
        <p class="created">
          Published at {new Date(post.createdAt).toLocaleDateString()}
        </p>
      {/if}
      {#if post.updatedAt && post.updatedAt !== post.createdAt}
        <p class="updated">
          Updated at {new Date(post.updatedAt).toLocaleDateString()}
        </p>
      {/if}
      <p>By <span>{post.author.name}</span></p>
    </div>
    <div class="bottom">
      <img src={post.mainImage} alt={post.title} />
    </div>
  </div>

  <div class="line"></div>
</a>

<style>
  .post {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 1rem;
    gap: 2rem;
    align-items: center;
    
    transition: var(--slow);
    
    & .top {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      & p {
        & span {
          font-weight: bold;
          font-style: italic;
          text-decoration: underline;
          color: var(--p);
        }
        
        &.updated,
        &.created {
          font-size: var(--fs-sm-sm);
          font-weight: bold;
          color: var(--p);
        }

        &.category {
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: bold;
          font-size: var(--fs-sm-sm);
        }
      }
    }
    & .bottom img {
      width: 100%;
      height: 100%;
      min-height: 300px;
      max-height: 320px;
      object-fit: cover;
      transform-origin: center;

      transition: var(--slow);

      &:hover {
        border-radius: 5px;
        filter: blur(0);
      }
    }
    &:hover {
      background-color: var(--l-10);
    }
  }
  .line {
    width: 90%;
    height: 1px;
    background-color: var(--l-75);
    margin: 0 auto;
  }
</style>
