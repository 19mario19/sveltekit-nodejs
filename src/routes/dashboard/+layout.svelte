<script lang="ts">
  import type { LayoutData } from "./$types"
  import Container from "$lib/components/shared/Container.svelte"
  import { ContainerDimension } from "$lib/types"
  import Users from "../../lib/components/dashboard/tabs/Users.svelte"
  import Posts from "../../lib/components/dashboard/tabs/Posts.svelte"

  enum DashboardTabs {
    Users = "users",
    Posts = "posts",
  }

  export let active: DashboardTabs = DashboardTabs.Users
</script>

<Container>
  <div class="dashboard">
    <nav>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <a href="/dashboard/tabs/users">
            <button
              on:click={() => (active = DashboardTabs.Users)}
              class:active={active === DashboardTabs.Users}>Users</button
            >
          </a>
        </li>
        <li>
          <a href="/dashboard/tabs/posts">
            <button
              on:click={() => (active = DashboardTabs.Posts)}
              class:active={active === DashboardTabs.Posts}>Posts</button
            >
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <slot />
</Container>

<style>
  .dashboard {
    display: flex;
    border-bottom: 1px solid var(--p-50);
    & nav {
      display: flex;
      justify-content: space-between;

      width: 100%;

      padding: 1rem;
      & ul {
        display: flex;
        gap: 1rem;
        align-items: center;

        & button {
          font-size: var(--fs-sm-xl);
          font-family: var(--font-t);
        }
        & .active {
          background-color: var(--a-75);
          color: white;
        }
      }
    }
  }
</style>
