<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<form action="?/logout" method="POST">
  <button>Log out</button>
</form>
