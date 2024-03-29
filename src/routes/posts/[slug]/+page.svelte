<script lang="ts">
  import type { PageData } from "./$types"
  import PostDetailed from "$lib/components/posts/PostDetailed.svelte"
  import Author from "$lib/components/author/Author.svelte"
  export let data: PageData
  import { recordAuthors } from "$lib/authorsDb"
  import { PersonName } from "$lib/types"
  let author = recordAuthors[data?.post.author.name as PersonName]

</script>

<PostDetailed post={data.post} />
