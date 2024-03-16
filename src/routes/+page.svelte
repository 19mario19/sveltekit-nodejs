<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData

  type Note = {
  id: string | number
  name: string
  createdAt: Date
}


  let note : Note
  let id = 1

  async function submit(id: Number | string) {
    const res = await fetch(`/api/${id}`)
    const data = await res.json()

    note = data.note
  }

  $: console.log(note)
</script>

<div class="notes">
  <pre class="json-pre">{JSON.stringify(data.notes, null, 4)}</pre>
  <hr />
  <pre class="json-pre">{JSON.stringify(data.note, null, 4)}</pre>

  <form on:submit={() => submit(id)}>
    <input min="1" max="5" type="number" bind:value={id} />
    <button>Submit</button>
  </form>

  {#if note}
  <hr />
  <pre class="json-pre">{JSON.stringify(note, null, 4)}</pre>
  <hr />
  {/if}
</div>
