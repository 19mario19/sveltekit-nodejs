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

  let formReset: BlogPost = {
    title: "",
    subtitle: "",
    category: BlogCategory.Art,
    author: recordAuthors[PersonName.DenaliBella],
    content: [],
  }

  let formData: BlogPost = {
    title: "The Ultimate Guide to Baking Cookies",
    subtitle:
      "Delicious recipes and tips for baking perfect cookies every time",
    content: [
      {
        id: 1,
        subheading: "Introduction to Baking Cookies",
      },
      {
        id: 2,
        description:
          "Classic Chocolate Chip Cookies - One of the most beloved cookie recipes is the classic chocolate chip cookie. With its perfect balance of sweet and savory flavors, it's sure to please any palate. Try our recipe for soft and chewy chocolate chip cookies that are sure to become a family favorite.",
      },
      {
        id: 3,
        image: "https://i.imgur.com/wAJ8AII.jpeg",
      },
      {
        id: 4,
        subtitle: "Tips for Perfect Cookies",
      },
      {
        id: 5,
        description:
          "Achieving the perfect cookie requires attention to detail and a few handy tips. From properly measuring ingredients to ensuring the oven is at the correct temperature, we'll cover everything you need to know to bake cookies like a pro.",
      },
      {
        id: 6,
        quote: {
          author: "John Doe",
          content: "I couldn't live without these cookies!",
        },
      },
      {
        id: 7,
        subtitle: "Decorating and Serving Ideas",
      },
      {
        id: 8,
        description:
          "Once your cookies are baked to perfection, it's time to get creative with decorating and serving. Whether you prefer classic cookies with a glass of milk or elaborate cookie platters for special occasions, we'll provide inspiration and tips for making your cookies look as good as they taste.",
      },
    ],
  }

  enum Component {
    Preview = "Preview",
    Json = "Json",
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
  async function submit(): Promise<void> {
    try {
      console.log("Trying to post: \n", formData)
      await fetch("/api/blog-posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    } catch (error) {
      console.log((error as Error).message)
    } finally {
      formData = { ...formReset }
      console.log("Submitted")
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
      <div class="components">
        {#if active === Component.Json}
          <div class="json">
            <h1>JSON</h1>
            <pre>{JSON.stringify(formData, null, 4)}</pre>
          </div>
        {:else if active === Component.Preview}
          <div class="preview">
            <h1>Preview</h1>
            <div class="top">
              <h2>{formData.title}</h2>
              <h3>{formData.subtitle}</h3>
              <div class="bottom">
                <p><strong>Category</strong>: {formData.category}</p>
                {#if formData.author}
                  <p><strong>By</strong> {formData.author.name}</p>
                  <p>
                    <strong>Description</strong> : {formData.author.description}
                  </p>
                {/if}
                <p><strong>{new Date().toLocaleDateString()}</strong></p>
              </div>
            </div>
            <div class="content">
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
                      <p class="description">{item.description}</p>
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
          </div>
        {/if}
        <div class="submit">
          <button on:click={submit}>Submit</button>
        </div>
      </div>
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
            {#each formData.content as item, index (index)}
              <div class="content-input">
                {#if item.subheading !== undefined}
                  <div class="input">
                    <input
                      type="text"
                      bind:value={item.subheading}
                      placeholder="Subheading"
                    />
                    <button
                      class="remove"
                      on:click={() => removeContent(item.id)}>X</button
                    >
                  </div>
                {/if}
                {#if item.subtitle !== undefined}
                  <div class="input">
                    <input
                      type="text"
                      bind:value={item.subtitle}
                      placeholder="Subtitle"
                    />
                    <button
                      class="remove"
                      on:click={() => removeContent(item.id)}>X</button
                    >
                  </div>
                {/if}
                {#if item.description !== undefined}
                  <div class="input">
                    <textarea
                      bind:value={item.description}
                      placeholder="Description"
                    ></textarea>
                    <button
                      class="remove"
                      on:click={() => removeContent(item.id)}>X</button
                    >
                  </div>
                {/if}
                {#if item.image !== undefined}
                  <div class="input">
                    <input
                      type="text"
                      bind:value={item.image}
                      placeholder="Image URL"
                    />
                    <img src={item.image} alt="" />
                    <button
                      class="remove"
                      on:click={() => removeContent(item.id)}>X</button
                    >
                  </div>
                {/if}
                {#if item.quote !== undefined}
                  <div class="input">
                    <input
                      type="text"
                      bind:value={item.quote.author}
                      placeholder="Author"
                    />
                    <textarea
                      bind:value={item.quote.content}
                      placeholder="Quote"
                    ></textarea>
                    <button
                      class="remove"
                      on:click={() => removeContent(item.id)}>X</button
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
    grid-template-columns: repeat(2, 1fr);
    gap: 5rem;
    padding: 5rem;
    box-shadow: var(--bs-lg);
  }

  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }

  .data .top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input,
  textarea {
    font-size: 17px;
    padding: 1rem 2rem;
    width: 100%;
    word-break: break-all;
  }

  textarea {
    min-height: 200px;
    max-width: 600px;
  }

  pre {
    font-size: 13px;
    white-space: pre-wrap; /* Add this line */
    margin: 2rem 0;
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

  .tabs {
    text-align: center;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  h1 {
    text-align: center;
    border-bottom: 1px solid;
  }

  .preview h1,
  .json h1 {
    font-family: var(--font-t);
    padding: 1.5rem 2rem;
  }
  .preview,
  .preview .top,
  .json {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
  }

  .preview {
    box-shadow: var(--bs-sm);
    padding: 3rem 2rem;
    margin: 1rem 0;
  }

  .preview .top {
    gap: 1.2rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .preview h2,
  .preview h3 {
    text-align: center;
  }

  .submit {
    display: flex;
    justify-content: center;
  }

  .input {
    position: relative;
    border: 3px solid transparent;
    border-radius: 5px;
    transition: var(--med);
  }
  .input .remove {
    position: absolute;
    right: -10%;
    top: 50%;
    transform: translateY(-50%) translateX(-100%);
    opacity: 0;
    transition: var(--med);

    z-index: -1;

    border-radius: 50%;
    box-shadow: var(--bs-sm);
  }
  .input:hover .remove {
    opacity: 1;
      transform: translateY(-50%) translateX(0);
  }

  .input:hover {
    border: 3px solid var(--a-50);
  }

  .content-input {
    display: flex;
    flex-direction: column;

    margin-bottom: 1rem;
  }

  blockquote p,
  blockquote footer {
    font-style: italic;
    text-align: right;
    font-size: var(--fs-sm-xl);
  }
  blockquote footer {
    font-weight: bold;
  }

  blockquote p::after,
  blockquote p::before {
    content: '"';
  }
</style>
