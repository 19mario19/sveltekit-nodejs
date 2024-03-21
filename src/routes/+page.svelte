<script lang="ts">
  import { ContentTypes, BlogCategory, PersonName } from "$lib/types"
  import type { ParagraphContent, BlogPost, ID } from "$lib/types"
  import { recordAuthors } from "$lib/authorsDb"
  import { convertContentToParagrphContent } from "$lib/helper/convert"

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
          convertContentToParagrphContent(el.type, el.id),
        ],
      }
    selectedContent = [el, ...selectedContent]
  }
  /**
   * Removes a content element from the selectedContent array and formData.content array based on its ID.
   *
   * @param {ID} id - The ID of the content element to be removed.
   * @return {void} This function does not return anything.
   */
  function removeContent(id: ID): void {
    // Filter out the element with the given ID from the selectedContent array
    selectedContent = selectedContent.filter((el) => el.id !== id)

    // If formData.content exists, filter out the element with the given ID from the formData.content array
    if (formData.content) {
      formData.content = formData.content
        .map((el) => (el.id !== id ? el : undefined))
        // Filter out undefined elements from the array
        .filter((el) => el !== undefined) as ParagraphContent[]
    }
  }
  let formData: BlogPost = {
    title: "",
    subtitle: "",
    category: BlogCategory.Art,
    author: recordAuthors[PersonName.DenaliBella],
    content: [],
  }

  enum Component {
    Json = "Json",
    Preview = "Preview",
  }

  let active: Component = Component.Preview
  function toggle(component: Component): void {
    if (component === Component.Json) {
      active = Component.Json
    }
    if (component === Component.Preview) {
      active = Component.Preview
    }
  }
</script>

<div class="container">
  <div class="wrapper">
    <div class="side">
      <div class="tabs">
        {#each Array.from(Object.values(Component)) as item}
          <button on:click={() => toggle(item)}>{item}</button>
        {/each}
      </div>
      {#if active === Component.Json}
        <div class="json">
          <h1>JSON</h1>
          <pre>{JSON.stringify(formData, null, 4)}</pre>
        </div>
      {:else if active === Component.Preview}
        <!-- Add this code inside the "preview" div -->
        <div class="preview">
          <h1>Preview</h1>
          <div class="top">
            <h2>{formData.title}</h2>
            <h3>{formData.subtitle}</h3>
          </div>
          {#if formData.content}
            {#each formData.content as item}
              <div>
                {#if item.subheading !== undefined}
                  <h4>{item.subheading}</h4>
                {/if}
                {#if item.subtitle !== undefined}
                  <h5>{item.subtitle}</h5>
                {/if}
                {#if item.description !== undefined}
                  <p>{item.description}</p>
                {/if}
                {#if item.image !== undefined}
                  <img src={item.image} alt="" />
                {/if}
                {#if item.quote !== undefined}
                  <blockquote>
                    <p>{item.quote.content}</p>
                    <footer>{item.quote.author}</footer>
                  </blockquote>
                {/if}
              </div>
            {/each}
          {/if}
        </div>
      {/if}
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
                  <button on:click={() => removeContent(item.id)}>Remove</button
                  >
                {/if}
                {#if item.subtitle !== undefined}
                  <input
                    type="text"
                    bind:value={item.subtitle}
                    placeholder="Subtitle"
                    class="content-input"
                  />
                   <button on:click={() => removeContent(item.id)}>Remove</button
                  >
                {/if}
                {#if item.description !== undefined}
                  <textarea
                    bind:value={item.description}
                    placeholder="Description"
                    class="content-textarea"
                  ></textarea>
                   <button on:click={() => removeContent(item.id)}>Remove</button
                  >
                {/if}
                {#if item.image !== undefined}
                  <input
                    type="text"
                    bind:value={item.image}
                    placeholder="Image URL"
                    class="content-input"
                  />
                  <img src={item.image} alt="" />
                   <button on:click={() => removeContent(item.id)}>Remove</button
                  >
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
                     <button on:click={() => removeContent(item.id)}>Remove</button
                  >
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

<!-- Add preview or json, preview in separate component! -->

<style>
  .container {
    max-width: 1460px;
    margin: 0 auto;
    border: 1px solid;
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

  input {
    font-size: 30px;
    padding: 1rem 2rem;
  }

  pre {
    font-size: 15px;
  }

  img {
    max-width: 100%;
    max-height: 500px;
    object-fit: cover;
  }

  .bottom h3 {
    font-family: var(--font-t);
    letter-spacing: 1px;
    padding: 2rem 0;
    font-size: 30px;
  }

  .preview h1,
  .json h1{
    font-family: var(--font-t);
  }
  .preview,
  .preview .top,
  .json {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
  }
  .preview .top{
    gap: 1.2rem;
    
   }

   .preview h2, .preview h3 {
    text-align: center;
   }


</style>
