<script lang="ts">
  import { ContainerDimension } from "$lib/types"
  import Container from "$lib/components/shared/Container.svelte"
  import type { PageData, ActionData } from "./$types"

  export let form: ActionData
</script>

<Container dimentions={ContainerDimension.Medium}>
  <div class="wrap">
    <h1>Register</h1>
    <form action="?/register" method="POST">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" placeholder="Your name" />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Your password"
      />

      {#if form?.user}
        <p class="error">User already exists.</p>
      {/if}
      {#if form?.invalid}
        <p class="error">Username and password is required.</p>
      {/if}

      <button type="submit">Register</button>
    </form>
  </div>
</Container>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 2rem;

    font-family: var(--font-s);

    gap: 1rem;

    & form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      & .error {
        color: var(--a);
      }

      & input {
        font-size: var(--fs-sm);
        border: 1px solid var(--l-75);
        border-radius: 10px;
      }
    }
  }
</style>
