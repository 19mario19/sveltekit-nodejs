<script lang="ts">
  import type { ParagraphContent } from "$lib/types"

  export let content: ParagraphContent[]
</script>

{#if content}
  <div class="content">
    {#each content as paragraph}
      <div class="paragraph">
        {#if paragraph.subheading !== undefined}
          <h2>{paragraph.subheading}</h2>
        {/if}
        {#if paragraph.subtitle !== undefined}
          <h3>{paragraph.subtitle}</h3>
        {/if}

        {#if paragraph.description !== undefined}
          <p>{paragraph.description}</p>
        {/if}

        {#if paragraph.image !== undefined}
          <img src={paragraph.image} alt={paragraph.subheading} />
        {/if}
        {#if paragraph.quote !== undefined}
          <blockquote>
            <h4>"{paragraph.quote.content}""</h4>
            <footer>{paragraph.quote.author}</footer>
          </blockquote>
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;

    & .paragraph {

        & h2 {
          margin-bottom: 1rem;
          text-align: center;
        }

      & img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 5px;
      }

      & blockquote {
        font-style: italic;
        text-align: end;
      }
    }
  }
</style>
