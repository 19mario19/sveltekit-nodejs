<script lang="ts">
  import { page } from "$app/stores"
  import { ContainerDimension, RoutePath } from "$lib/types"
  import Container from "./shared/Container.svelte"
  let active: RoutePath = $page.url.pathname as RoutePath
  $: active = $page.url.pathname as RoutePath
</script>

<div class="container-wrapper">
  <Container dimentions={ContainerDimension.Large}>
    <nav aria-label="Main Navigation">
      <h1>Blog</h1>
      <ul>
        <li>
          <a class:active={active === RoutePath.Home} href={RoutePath.Home}
            >Home</a
          >
        </li>
        <li>
          <a class:active={active === RoutePath.Posts} href={RoutePath.Posts}
            >Posts</a
          >
        </li>
        <li>
          <a class:active={active === RoutePath.Create} href={RoutePath.Create}
            >Create</a
          >
        </li>
      </ul>
    </nav>
  </Container>
</div>

<style>
  .container-wrapper {
    background-color: var(--l-10);
    z-index: 9999;

    position: sticky;
    top: 0;

    opacity: 0.95;
  }

  nav {
    display: flex;
    align-items: center;
    padding: var(--sp-base) var(--sp-lg);
  }

  ul {
    display: flex;
    gap: 1rem;

    width: 100%;

    justify-content: end;
    align-items: center;
  }

  a {
    font-size: var(--fs-base);
  }

  .active {
    color: var(--a);
  }

  h1, li {
    font-family: var(--font-t);
  }
  h1::first-letter {
    font-size: 50px;
    color: var(--a);
    text-shadow: var(--bs-sm);
  }

  @media screen and (max-width: 768px) {
    ul {
      flex-wrap: wrap;
    }

    h1 {
      font-size: var(--fs-lg);
    }

    a {
      font-size: var(--fs-sm);
    }
  }
</style>
