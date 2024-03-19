<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import { browser } from "$app/environment"
  import type { PageData } from "./$types"
  import { ApiRoutes, BlogCategory, PersonName, ContentTypes } from "$lib/types"
  import type { BlogPost, ParagraphContent, Quote } from "$lib/types"
  import { recordAuthors } from "$lib/authorsDb"

  export let data: PageData

  const paragraphContentList: ContentTypes[] = Array.from(
    Object.values(ContentTypes),
  )

  let selectedArray: { id: number | string; type: ContentTypes }[] = []
  let convertedList: ParagraphContent[] = []

  function addParagraphContent(item: ContentTypes): void {
    const object = {
      id: selectedArray.length + 1,
      type: item,
    }
    selectedArray = [object, ...selectedArray]
  }
  function removeParagraphContent(id: number | string) {
    selectedArray = [...selectedArray].filter((item) => item.id !== id)
  }

  let formData: BlogPost = {}
  function resetFormData() {
    formData = {}
    selectedArray = []
    convertedList = []
  }

  function convertContentTypesToContent(
    element: ContentTypes,
  ): ParagraphContent {
    switch (element) {
      case ContentTypes.Subheading:
        return { subheading: "" }
      case ContentTypes.Subtitle:
        return { subtitle: "" }
      case ContentTypes.Description:
        return { description: "" }
      case ContentTypes.Image:
        return { image: "" }
      case ContentTypes.Quote:
        return {
          quote: {
            author: "",
            content: "",
          },
        }
      case ContentTypes.Unordered_List:
        return { ul: [] }
      case ContentTypes.Ordered_List:
        return { ol: [] }
      default:
        return {}
    }
  }
  function convertContentTypesToContentArray(array: ContentTypes[]) {
    array.forEach((el) => {
      convertedList = [...convertedList, convertContentTypesToContent(el)]
    })
    formData.content = convertedList
  }

  let currentId: any

  // post
  async function postNote(name: string) {
    try {
      const res = await fetch(ApiRoutes.BlogPosts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      if (!res.ok) {
        throw new Error("Failed to create note")
      }

      const data = await res.json()
      // refreshes the data from load function
      if (browser) invalidateAll()
      console.log("New note created:", data.note)
    } catch (error) {
      console.error("Error:", (error as Error).message)
    } finally {
      console.log("Fetch operation has finished!")
    }
  }

  $: console.log(convertedList, formData)
</script>

<div class="wrapper">
  <div class="side">
    <div class="top">
      Add to formData
      <button
        on:click={() =>
          convertContentTypesToContentArray(selectedArray.map((el) => el.type))}
        >Add</button
      >
    </div>

    <button on:click={() => addParagraphContent(ContentTypes.Subheading)}
      >Subheading h3</button
    >
    <button on:click={() => addParagraphContent(ContentTypes.Subtitle)}
      >Subtitle h4</button
    >
    <button on:click={() => addParagraphContent(ContentTypes.Description)}
      >Description p</button
    >
    <button on:click={() => addParagraphContent(ContentTypes.Ordered_List)}
      >Ordered list ol</button
    >
    <button on:click={() => addParagraphContent(ContentTypes.Image)}
      >Image url</button
    >

    <h2>Remove by id</h2>
    <select name="" id="" bind:value={currentId}>
      {#each selectedArray as item}
        <option value={item.id}>{item.id} - {item.type}</option>
      {/each}
    </select>
    <button on:click={() => removeParagraphContent(currentId)}
      >Remove item</button
    >
    <button on:click={resetFormData}>Remove all</button>
  </div>
  <main>
    <div class="notes">
      <pre class="json-pre">{JSON.stringify(selectedArray, null, 4)}</pre>
      <hr />
      <pre class="json-pre">{JSON.stringify(data.blogPosts, null, 4)}</pre>
    </div>
  </main>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 10fr;
    gap: 2rem;

    & .side {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 10rem 5rem;
    }
  }
</style>
