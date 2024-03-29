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
      <p>{post.category}</p>
    </div>
  </div>
</a>

<style>
  .post {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 400px;
    padding: 2rem;
    transition: var(--slow);
    border-radius: 15px;
    text-align: center;


    & .top {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
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
