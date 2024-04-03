<script lang="ts">
  import { ContainerDimension } from "$lib/types"
  import Container from "$lib/components/shared/Container.svelte"
  import type { LayoutData } from "./$types"
  import { page } from "$app/stores"

  enum Tabs {
    Users = "/dashboard/tabs/users",
    Posts = "/dashboard/tabs/posts",
  }

  let active = $page.url.pathname as Tabs
  $: active = $page.url.pathname as Tabs

  $: console.log(active)

  export let data: LayoutData
</script>

<Container>
  <nav>
    <h1>Dashboard</h1>
    <ul>
      <li>
        <a class:active={active === Tabs.Users} href="/dashboard/tabs/users"
          >Users</a
        >
      </li>
      <li>
        <a class:active={active === Tabs.Posts} href="/dashboard/tabs/posts"
          >Posts</a
        >
      </li>
    </ul>
  </nav>
  <slot />
</Container>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    & h1 {
      font-size: var(--fs-lg);
    }

    & ul {
      display: flex;
      gap: 1rem;

      & li {
        font-size: var(--fs-base);

        & a {
          padding: 0.5rem 1rem;
          border-radius: 15px;
          border: 1px solid var(--l-50);
          font-weight: bold;

          transition: var(--med);

          &.active {
            background-color: var(--a-50);
            color: white;
          }
        }
      }
    }
  }
</style>
