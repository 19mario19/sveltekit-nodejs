<script lang="ts">
  import type { Author } from "$lib/types"

  export let author: Author
</script>

<div class="author">
  <div class="top">
    <img src={author.img} alt={author.name} />
    <p>{author.name}</p>
  </div>
  <div class="description">
    <p>{author.description}</p>
  </div>
</div>

<style>
  .author {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    width: 100%;
    background-color: var(--l-10);
    /* border: 1px solid var(--l-50); */

    & .top {
      position: relative;

      & img {
        width: 200px !important;
        height: 200px !important;
        object-fit: cover;
        border-radius: 15px;
        border-radius: 50% !important;
        border: 5px solid var(--a-35);
      }
      & p {
        position: absolute;
        color: white;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);

        min-width: 150px;

        background-color: var(--p-50);
        padding: 0.2rem 0.5rem;
        border-radius: 5px;
      }
    }
  }
</style>
