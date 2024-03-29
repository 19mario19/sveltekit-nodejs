<script lang="ts">
  import { ContainerDimension } from "$lib/types"

  export let dimentions: ContainerDimension = ContainerDimension.Large
</script>

<div class="container" style={dimentions}>
  <slot />
</div>
