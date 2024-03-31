<script lang="ts">
  import { recordAuthors } from "$lib/authorsDb"
  import { formDataInstance, formData } from "$lib/formData/formData"
  import type { BlogPost, ParagraphContent } from "$lib/types"
  import { ContentTypes, BlogCategory, PersonName } from "$lib/types"
  import { blur, slide, fade } from "svelte/transition"
  import { goto, invalidateAll } from "$app/navigation"
  import Container from "$lib/components/shared/Container.svelte"
  import { ContainerDimension } from "$lib/types"

  // let form: BlogPost = {
  //   title: "",
  //   subtitle: "",
  //   mainImage: "",
  //   content: [] as ParagraphContent[],
  //   category: BlogCategory.Art,
  //   author: recordAuthors[PersonName.DenaliBella],
  // }

  // Initializes the form with default values
  let form: BlogPost = {
    title:
      "Unleash Your Inner Supermodel: A Comprehensive Guide to Modeling for Women",
    subtitle:
      "Discover the secrets to a successful and empowering modeling career",
    mainImage:
      "https://c.wallhere.com/images/d0/d0/3c9203dca6873e85879197389228-1520111.jpg!d",
    category: BlogCategory.Art,
    author: recordAuthors[PersonName.MichaelMiller],
    content: [
      {
        id: 1,
        subheading: "Introduction to the Captivating World of Modeling",
      },
      {
        id: 2,
        description:
          "Modeling is a dynamic and multifaceted industry that celebrates the beauty, grace, and individuality of women. From the glitz and glamour of high-fashion runways to the artistry of editorial shoots, modeling offers a platform for self-expression and empowerment. In this comprehensive guide, we'll explore the many facets of this exciting profession and provide you with the tools and insights you need to embark on a successful and fulfilling modeling journey.",
      },
      {
        id: 3,
        image:
          "https://c.wallhere.com/images/52/8c/3bd7c22b3a5abe40f7debd9f372d-1520109.jpg!d",
      },
      {
        id: 4,
        subtitle: "Cultivating Confidence and Self-Love",
      },
      {
        id: 5,
        description:
          "Confidence is the cornerstone of a successful modeling career. It's not just about physical attributes; it's about embracing your unique beauty and radiating self-assurance from within. In this section, we'll delve into strategies for building self-confidence, overcoming insecurities, and developing a positive body image that will shine through in every shot and catwalk appearance.",
      },
      {
        id: 6,
        quote: {
          author: "Tyra Banks",
          content:
            "Embrace your individuality and celebrate your uniqueness. That's what modeling is all about.",
        },
      },
      {
        id: 7,
        subtitle: "Mastering the Art of Posing and Movement",
      },
      {
        id: 8,
        description:
          "Whether you're posing for a high-fashion editorial or commanding the runway, understanding the art of posing and movement is crucial. We'll explore techniques for achieving flattering angles, conveying emotion through body language, and captivating your audience with grace and poise. From mastering the classic poses to experimenting with avant-garde styles, you'll learn to showcase your best assets and bring your unique personality to life.",
      },
      {
        id: 9,
        image:
          "https://c.wallhere.com/photos/76/94/county_blue_light_sunset_summer_sky_sun_abstract-771233.jpg!d",
      },
      {
        id: 10,
        subtitle: "Building a Successful Modeling Portfolio",
      },
      {
        id: 11,
        description:
          "Your modeling portfolio is your calling card, a visual representation of your talents and versatility. In this section, we'll guide you through the process of curating a compelling portfolio that showcases your best work and attracts the attention of agencies and clients. From selecting stunning photographs to crafting a cohesive narrative, we'll cover the essential elements of a standout modeling portfolio.",
      },
      {
        id: 12,
        subtitle: "Navigating the Modeling Industry",
      },
      {
        id: 13,
        description:
          "The modeling industry is a dynamic and ever-evolving landscape, filled with opportunities and challenges. We'll provide insights into the various sectors of the industry, from commercial modeling to high-fashion editorials, and offer practical advice on finding reputable agencies, negotiating contracts, and maintaining a healthy work-life balance. Additionally, we'll discuss the importance of professionalism, networking, and continuous learning to stay ahead in this competitive field.",
      },
      {
        id: 14,
        quote: {
          author: "Cara Delevingne",
          content:
            "Modeling is not just about looking pretty; it's about being yourself and embracing your individuality.",
        },
      },
      {
        id: 15,
        subtitle: "Embracing Diversity and Inclusivity",
      },
      {
        id: 16,
        description:
          "In recent years, the modeling industry has undergone a significant transformation, celebrating diversity and inclusivity like never before. In this section, we'll explore the importance of representation and how models of all backgrounds, sizes, and abilities are redefining beauty standards and inspiring confidence in women worldwide. We'll also discuss the role of ethical practices and body positivity in shaping a more inclusive and empowering modeling landscape.",
      },
    ],
  }

  const data = formDataInstance(form)

  enum ResponseType {
    Success = "success",
    Error = "error",
    Initiated = "initiated",
  }

  let errors = { title: "", subtitle: "", mainImage: "" }

  let response: ResponseType = ResponseType.Initiated

  async function submit() {
    // e.preventDefault()

    // Form validation
    if (!$formData.title?.trim()) {
      errors.title = "Please enter a title"
    } else {
      errors.title = ""
    }
    if (!$formData.subtitle?.trim()) {
      errors.subtitle = "Please enter a subtitle"
    } else {
      errors.subtitle = ""
    }
    if (!$formData.mainImage?.trim()) {
      errors.mainImage = "Please enter a main image"
    } else {
      errors.mainImage = ""
    }

    if (errors.title || errors.subtitle || errors.mainImage) {
      response = ResponseType.Error
      return
    }

    try {
      response = ResponseType.Initiated
      const res = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify($formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        response = ResponseType.Success
        data.clear()
        invalidateAll()
        // alert("Blog post created")
      } else {
        response = ResponseType.Error
        // alert("Failed to create blog post. Please try again.")
      }
    } catch (error) {
      response = ResponseType.Error
      console.log((error as Error).message)
      // alert("An error occurred. Please try again.")
    } finally {
      console.log(`Response: ${response}`)
    }
  }
  $: if (response === ResponseType.Success) {
    setTimeout(() => {
      goto("/posts")
    }, 500)
  }
  $: console.log(response)

  $: $formData = form
</script>

<Container dimentions={ContainerDimension.Medium}>
  <div class="formData">
    <main>
      <h1>
        <strong>Here</strong> is the place where <strong>you</strong> can
        <strong>create</strong> :
      </h1>
      <form>
        <div class="top">
          <div class="category">
            <select bind:value={$formData.category}>
              {#each Array.from(Object.values(BlogCategory)) as category}
                <option value={category}>{category}</option>
              {/each}
            </select>
          </div>
          {#if errors.title}
            <p class="error">{errors.title}</p>
          {/if}
          <textarea
            class="title"
            class:error={errors.title}
            placeholder={errors.title
              ? "You forgot to enter a title"
              : "Your title"}
            bind:value={$formData.title}
          />
          {#if errors.subtitle}
            <p class="error">{errors.subtitle}</p>
          {/if}
          <textarea
            class="subtitle"
            class:error={errors.subtitle}
            placeholder={errors.title
              ? "You forgot to enter a subtitle"
              : "Your subtitle"}
            bind:value={$formData.subtitle}
          />

          <div class="main-image">
            {#if errors.mainImage}
              <p transition:fade class="error">{errors.mainImage}</p>
            {/if}
            <div class="input-data">
              {#if $formData.mainImage}
                <img src={$formData.mainImage} alt="" />
              {/if}
              <input
                type="text"
                class="image"
                class:error={errors.mainImage}
                placeholder={errors.title
                  ? "You forgot to enter the URL of your image"
                  : "Your Main Image"}
                bind:value={$formData.mainImage}
              />
              <button class="remove" on:click={() => ($formData.mainImage = "")}
                >Clear</button
              >
            </div>
          </div>
        </div>

        {#if $formData.content}
          <div class:isEmpty={!$formData.content[0]} class="form-container">
            {#each $formData.content as item (item.id)}
              <div
                class="input-data"
                transition:slide={{
                  duration: 300,
                }}
              >
                {#if item.description !== undefined}
                  <textarea
                    class="description"
                    placeholder="Your description"
                    bind:value={item.description}
                  />
                  <button
                    class="remove"
                    on:click|preventDefault={() =>
                      data.removeParagraph(item.id)}>Remove</button
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
                    on:click|preventDefault={() =>
                      data.removeParagraph(item.id)}>Remove</button
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
                    on:click|preventDefault={() =>
                      data.removeParagraph(item.id)}>Remove</button
                  >
                {/if}
                {#if item.image !== undefined}
                  {#if item.image}
                    <img src={item.image} alt="" />
                  {/if}
                  <input
                    type="text"
                    class="image"
                    placeholder="Your image URL"
                    bind:value={item.image}
                  />

                  <button
                    class="remove"
                    on:click|preventDefault={() =>
                      data.removeParagraph(item.id)}>Remove</button
                  >
                {/if}
                {#if item.quote !== undefined}
                  <blockquote>
                    <div class="content">
                      <textarea
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
                    on:click|preventDefault={() =>
                      data.removeParagraph(item.id)}>Remove</button
                  >
                {/if}
              </div>
            {/each}
          </div>
        {/if}
        <div class="buttons">
          {#each Array.from(Object.values(ContentTypes)) as item}
            <button on:click|preventDefault={() => data.addParagraph(item)}
              >Add {item.charAt(0).toUpperCase() + item.slice(1)}</button
            >
          {/each}
          {#if $formData.content?.[0]}
            <button class="clear" on:click={() => data.clear()}
              >Clear all</button
            >
          {/if}
        </div>
        <button class="submit" on:click={submit}>Submit</button>
      </form>
    </main>
  </div>
</Container>

<style>
  .formData {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    padding: 2rem;

    & .top {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
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

  .category {
    display: flex;
    margin: 0 auto;

    & select {
      padding: 0.5rem;
      border-radius: 15px;
      margin: 0 auto;
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
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
    transition: var(--med);
  }

  .input-data:hover {
    background-color: var(--l-10);
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
    border-radius: 15px;
  }

  .main-image img {
    height: 500px;
  }

  .title,
  .subtitle {
    text-align: center;
  }

  textarea.title {
    font-size: var(--fs-xl);
    font-weight: bold;
  }

  textarea.subtitle {
    font-size: var(--fs-base);
    font-weight: 600;
  }

  blockquote {
    font-style: italic;
    font-size: var(--fs-sm);
  }

  input,
  textarea {
    width: 100%;
    border: 2px solid var(--l-50);
    border-radius: 15px;
    background-color: white;
  }

  input:hover,
  textarea:hover {
    border: 2px solid var(--a-50);
  }

  blockquote input,
  blockquote textarea {
    text-align: right;
  }

  blockquote textarea {
    font-size: var(--fs-base);
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

  .subheading {
    font-size: var(--fs-lg);
    line-height: 30px;
  }
  .subtitle-content {
    font-size: var(--fs-base);
    line-height: 30px;
  }

  button.submit {
    width: 100%;
    padding: 2rem;
  }

  input:active,
  input:focus,
  textarea:active,
  textarea:focus {
    border: 2px solid var(--p-50);
  }

  p.error {
    text-align: center;
    background-color: var(--l-35);
    width: fit-content;
    margin: 0 auto;
    padding: 0.5rem;
    border-radius: 5px;
  }

  input.error,
  textarea.error {
    background-color: var(--a-35) !important;
  }
</style>
