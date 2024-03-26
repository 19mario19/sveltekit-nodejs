<script lang="ts">
  import { recordAuthors } from "$lib/authorsDb"
  import { formDataInstance, formData } from "$lib/formData/formData"
  import type { BlogPost, ParagraphContent } from "$lib/types"
  import { ContentTypes, BlogCategory, PersonName } from "$lib/types"
  import { blur, slide } from "svelte/transition"

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
      "https://c.wallhere.com/images/c0/0c/c6b6be8b11a80e8800d7d429c79e-1223471.jpg!d",
    category: BlogCategory.Art,
    author: recordAuthors[PersonName.DavidBrown],
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
          "https://c.wallhere.com/images/3a/0b/9e779828e0e8bb52eabdeefd4297-1479345.jpg!d",
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
          "https://c.wallhere.com/images/c6/06/ddabbba09d0cd79ce87c2a30dcae-1479355.jpg!d",
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

  async function submit(e: Event) {
    e.preventDefault()

    // Form validation
    if (!$formData.title) {
      errors.title = "Please enter a title"
    } else {
      errors.title = ""
    }
    if (!$formData.subtitle) {
      errors.subtitle = "Please enter a subtitle"
    } else {
      errors.subtitle = ""
    }
    if (!$formData.mainImage) {
      errors.mainImage = "Please enter a main image"
    } else {
      errors.mainImage = ""
    }

    if (errors.title || errors.subtitle || errors.mainImage) {
      return
    }

    let response: ResponseType = ResponseType.Initiated
    try {
      const res = await fetch("/api/blog-posts/", {
        method: "POST",
        body: JSON.stringify($formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        response = ResponseType.Success
        data.clear()
        alert("Blog post created")
      } else {
        response = ResponseType.Error
        alert("Failed to create blog post. Please try again.")
      }
    } catch (error) {
      response = ResponseType.Error
      console.log((error as Error).message)
      alert("An error occurred. Please try again.")
    } finally {
      console.log(`Response: ${response}`)
    }
  }

  $: $formData = form

  $: console.log(errors)
</script>

<div class="formData">
  <main>
    <h1>
      <strong>Here</strong> is the place where <strong>you</strong> can
      <strong>create</strong> :
    </h1>
    <form>
      <div class="top">
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
        <input
          type="text"
          class="subtitle"
          class:error={errors.subtitle}
          placeholder={errors.title
            ? "You forgot to enter a subtitle"
            : "Your subtitle"}
          bind:value={$formData.subtitle}
        />

        <div class="main-image">
          {#if errors.mainImage}
            <p class="error">{errors.mainImage}</p>
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
              >Remove</button
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
                  on:click={() => data.removeParagraph(item.id)}>Remove</button
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

  textarea.title {
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
    border: 2px solid var(--l-50);
    border-radius: 15px;
  }

  input:hover,
  textarea:hover {
    border: 2px solid var(--a-50);
  }

  blockquote input,
  blockquote textarea {
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

  .subheading {
    font-size: var(--fs-lg);
    line-height: 30px;
  }
  .subtitle-content {
    font-size: var(--fs-base);
    line-height: 30px;
  }

  input.error {
    background-color: var(--a-35) !important;
  }
</style>
