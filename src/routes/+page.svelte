<script lang="ts">
  import { ContentTypes, BlogCategory, PersonName } from "$lib/types"
  import type { ParagraphContent, BlogPost } from "$lib/types"
  import { recordAuthors } from "$lib/authorsDb"
  import { convertContentToParagrphContent } from "$lib/helper/convert"

  type ID = string | number
  type ContentTypesID = { id: ID; type: ContentTypes }

  let selectedContent: ContentTypesID[] = []
  function addContent(item: ContentTypes): void {
    const el: ContentTypesID = {
      id: selectedContent.length + 1,
      type: item,
    }

    if (formData.content)
      formData = {
        ...formData,
        content: [
          ...formData.content,
          convertContentToParagrphContent(el.type),
        ],
      }
    selectedContent = [el, ...selectedContent]
  }
  function removeContent(id: ID): void {
    selectedContent = [...selectedContent].filter((el) => el.id !== id)
  }

  let formData: BlogPost = {
    title: "",
    subtitle: "",
    category: BlogCategory.Art,
    author: recordAuthors[PersonName.DenaliBella],
    content: [],
  }

  $: console.log(formData)
</script>

<div class="container">
  <div class="wrapper">
    <div class="side">
      <pre>{JSON.stringify(formData, null, 4)}</pre>
    </div>
    <div class="page">
      <div class="data">
        <div class="top">
          <div class="input">
            <label>
              <input
                type="text"
                bind:value={formData.title}
                placeholder="Your title"
              />
            </label>
          </div>
          <div class="input">
            <label>
              <input
                type="text"
                bind:value={formData.subtitle}
                placeholder="Your subtitle"
              />
            </label>
          </div>
          <div class="input">
            Category:
            <select bind:value={formData.category}>
              {#each Array.from(Object.values(BlogCategory)) as item}
                <option value={item}>{item}</option>
              {/each}
            </select>
          </div>
          <div class="input">
            Author:
            <select bind:value={formData.author}>
              {#each Array.from(Object.values(PersonName)) as item}
                <option value={recordAuthors[item]}>{item}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="bottom">
          <h3>Create your content here:</h3>

          {#if formData.content}
            {#each formData.content as item, index}
              <div class="content-item">
                {#if item.subheading !== undefined}
                  <input
                    type="text"
                    bind:value={item.subheading}
                    placeholder="Subheading"
                    class="content-input"
                  />
                {/if}
                {#if item.subtitle !== undefined}
                  <input
                    type="text"
                    bind:value={item.subtitle}
                    placeholder="Subtitle"
                    class="content-input"
                  />
                {/if}
                {#if item.description !== undefined}
                  <textarea
                    bind:value={item.description}
                    placeholder="Description"
                    class="content-textarea"
                  ></textarea>
                {/if}
                {#if item.image !== undefined}
                  <input
                    type="text"
                    bind:value={item.image}
                    placeholder="Image URL"
                    class="content-input"
                  />
                  <img src={item.image} alt="">
                {/if}
                {#if item.quote !== undefined}
                  <div class="quote-container">
                    <input
                      type="text"
                      bind:value={item.quote.author}
                      placeholder="Author"
                      class="content-input"
                    />
                    <textarea
                      bind:value={item.quote.content}
                      placeholder="Quote"
                      class="content-textarea"
                    ></textarea>
                  </div>
                {/if}
              </div>
            {/each}
          {/if}
        </div>
      </div>
      <div class="buttons">
        {#each Array.from(Object.values(ContentTypes)) as item}
          <button on:click={() => addContent(item)}
            >{`${item.charAt(0).toUpperCase()}${item.slice(1)}`}</button
          >
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1460px;
    margin: 0 auto;
    border: 1px solid ;
    border-top: none;
    border-bottom: none;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 2fr 5fr;
    padding: 5rem;
  }

  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .data .top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .content-item {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .content-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  .content-textarea {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    min-height: 100px;
  }

  .quote-container {
    display: flex;
    gap: 1rem;
  }

  .content-button {
    border: none;
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  .content-button:hover {
    background-color: #0056b3;
  }

  input {
    font-size: 30px;
    padding: 1rem 2rem;
  }

  pre {
    font-size:15px;
  }

  img {
    max-width: 100%;
    max-height: 500px;
    object-fit: cover;
  }
</style>
