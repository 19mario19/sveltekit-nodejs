<script lang="ts">
  import { enhance } from "$app/forms"
  import type { PageData } from "./$types"
  export let data: PageData
  
</script>

<form method="POST" use:enhance>
  <button formaction="?/logout" type="submit">Log out</button>
</form>
