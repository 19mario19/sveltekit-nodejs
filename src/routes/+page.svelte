<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import { browser } from "$app/environment"
  import type { PageData } from "./$types"

  export let data: PageData

  let name = ""

  function resetName() {
    name = ""
  }

  // post
  async function postNote(name: string) {
    try {
      const res = await fetch("/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      if (!res.ok) {
        throw new Error("Failed to create note")
      }

      resetName()
      const data = await res.json()
      // refreshes the data from load function
      if (browser) invalidateAll()
      console.log("New note created:", data.note)
    } catch (error) {
      console.error("Error:", error.message)
    } finally {
      console.log("Fetch operation has finished!")
    }
  }
</script>

<input
  type="text"
  name=""
  id=""
  bind:value={name}
  on:keydown={(e) => {
    if (e.key === "Enter") {
      postNote(name)
    }
  }}
/>
<button on:click={() => postNote(name)}>Post</button>

<div class="notes">
  <pre class="json-pre">{JSON.stringify(data.notes, null, 4)}</pre>
  <hr />
  <pre class="json-pre">{JSON.stringify(data.note, null, 4)}</pre>
</div>
