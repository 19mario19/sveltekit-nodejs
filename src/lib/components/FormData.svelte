<script lang="ts">
  import { formDataInstance, formData } from "$lib/formData/formData"
  import type { BlogPost } from "$lib/types"
  import { ContentTypes } from "$lib/types"
  import { blur } from "svelte/transition"

  //   let form: BlogPost = {
  //     title: "",
  //     subtitle: "",
  //     content: [] as ParagraphContent[],
  //   }

  let form: BlogPost = {
    title: "The Ultimate Guide to Baking Cookies",
    subtitle:
      "Delicious recipes and tips for baking perfect cookies every time",
    mainImage:
      "https://c.wallhere.com/images/c0/0c/c6b6be8b11a80e8800d7d429c79e-1223471.jpg!d",
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
        image:
          "https://c.wallhere.com/images/1e/94/07153b8def3a698615d5572e8099-1494609.jpg!d",
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

  const data = formDataInstance(form)

  async function submit() {
    const res = await fetch("/api/blog-posts/", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      formData.set({ content: [] });
      alert("Blog post created");
    }
  }

  $: form = $formData

  console.log(form)
</script>

<div class="formData">
  <main>
    <h1>
      <strong>Here</strong> is the place where <strong>you</strong> can
      <strong>create</strong> :
    </h1>
    <form action="">
      <div class="top">
        <input
          type="text"
          class="title"
          placeholder="Your title"
          bind:value={form.title}
        />
        <input
          type="text"
          class="subtitle"
          placeholder="Your subtitle"
          bind:value={form.subtitle}
        />
        {#if $formData.mainImage}
          <div class="main-image">
            <div class="input-data">
              <img src={$formData.mainImage} alt="" />
              <input
                type="text"
                class="image"
                bind:value={$formData.mainImage}
              />
              <button
                class="remove"
                on:click={() => ($formData.mainImage = undefined)}
                >Remove</button
              >
            </div>
          </div>
        {/if}
      </div>

      {#if $formData.content}
        <div class:isEmpty={!$formData.content[0]} class="form-container">
          {#each $formData.content as item (item.id)}
            <div class="input-data" transition:blur={{ duration: 500 }}>
              {#if item.description !== undefined}
                <textarea
                  class="description"
                  placeholder="Your description"
                  bind:value={item.description}
                />
                <button
                  class="remove"
                  on:click={() => data.removeParagraph(item.id)}>Remove</button
                >
              {/if}
              {#if item.subheading !== undefined}
                <input
                  type="text"
                  class="subheading"
                  placeholder="Your subheading"
                  bind:value={item.subheading}
                />
                <button
                  class="remove"
                  on:click={() => data.removeParagraph(item.id)}>Remove</button
                >
              {/if}
              {#if item.subtitle !== undefined}
                <input
                  type="text"
                  class="subtitle-content"
                  placeholder="Your subtitle"
                  bind:value={item.subtitle}
                />
                <button
                  class="remove"
                  on:click={() => data.removeParagraph(item.id)}>Remove</button
                >
              {/if}
              {#if item.image !== undefined}
                <img src={item.image} alt="" />
                <input
                  type="text"
                  class="image"
                  placeholder="Your image URL"
                  bind:value={item.image}
                />

                <button
                  class="remove"
                  on:click={() => data.removeParagraph(item.id)}>Remove</button
                >
              {/if}
              {#if item.quote !== undefined}
                <blockquote>
                  <div class="content">
                    <input
                      class="quote content"
                      placeholder="Your quote"
                      bind:value={item.quote.content}
                    />
                  </div>
                  <footer>
                    <input
                      class="quote author"
                      placeholder="Your author"
                      bind:value={item.quote.author}
                    />
                  </footer>
                </blockquote>
                <button
                  class="remove"
                  on:click={() => data.removeParagraph(item.id)}>Remove</button
                >
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </form>
    <div class="buttons">
      {#each Array.from(Object.values(ContentTypes)) as item}
        <button on:click={() => data.addParagraph(item)}
          >Add {item.charAt(0).toUpperCase() + item.slice(1)}</button
        >
      {/each}
      {#if $formData.content?.[0]}
        <button class="clear" on:click={() => data.clear()}>Clear all</button>
      {/if}
    </div>
  </main>
  <button on:click={submit}>Submit</button>
</div>

<style>
  .formData {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 960px;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    gap: 2rem;

    padding: 2rem;

    & .top {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    & > * {
      padding: 2rem;
    }

    & main,
    & .form-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      /* margin: 3rem 0; */
    }
    & .top,
    .form-container {
      border: 1px solid var(--l-75);
      border-radius: 15px;
      padding: 1rem;
    }

    & main h1 {
      font-family: var(--font-t);
      font-weight: 400;
      text-align: center;
      margin-bottom: 2rem;
    }
  }
  .buttons {
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  button.clear {
    background-color: var(--a-50);
  }

  .input-data {
    border: 1px solid var(--l-50);
    position: relative;
    border-radius: 15px;
  }

  .input-data input.image {
    background-color: var(--l-50);
    font-size: var(--fs-sm);
    text-align: center;
  }

  .input-data button.remove {
    position: absolute;
    right: -12%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: var(--med);
    box-shadow: var(--bs-sm);
  }

  .input-data:hover button.remove,
  .input-data:focus-within button.remove,
  .input-data:active button.remove {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 2px;
  }

  .main-image img {
    height: 500px;
  }

  .title,
  .subtitle {
    text-align: center;
  }

  input.title {
    font-size: var(--fs-xl);
    font-weight: bold;
  }

  input.subtitle {
    font-weight: 600;
  }

  blockquote {
    font-style: italic;
    font-size: var(--fs-sm);
  }

  input,
  textarea {
    width: 100%;
    border: 2px solid transparent;
    border-radius: 15px;
  }

  input:hover,
  textarea:hover {
    border: 2px solid var(--a-50);
  }

  blockquote input {
    text-align: right;
  }
  blockquote footer input {
    font-weight: bold;
  }

  .isEmpty {
    opacity: 0;
  }

  /* form container */

  .description {
    font-size: var(--fs-sm);
    line-height: 22px;
  }
  .remove {
  }
  .subheading {
    font-size: var(--fs-lg);
    line-height: 30px;
  }
  .subtitle-content {
    font-size: var(--fs-base);
    line-height: 30px;
  }

  h1 {
    font-size: var(--fs-xl);
    line-height: 40px;
  }

  h2 {
    font-size: var(--fs-lg);
    line-height: 30px;
  }

  h3 {
    font-size: var(--fs-base);
    line-height: 30px;
  }

  h4 {
    font-size: var(--fs-sm-xl);
    line-height: 26px;
  }
  h5 {
    font-size: var(--fs-sm-s);
    line-height: 24px;
  }
</style>
