<script lang="ts">
  import { page } from "$app/stores"
  import { ContainerDimension, RoutePath, UserRole } from "$lib/types"
  import Container from "./shared/Container.svelte"

  let active: RoutePath = $page.url.pathname as RoutePath
  $: active = $page.url.pathname as RoutePath

  $: role = $page.data.user?.role as UserRole
</script>

<div class="container-wrapper">
  <Container dimentions={ContainerDimension.Large}>
    <nav aria-label="Main Navigation">
      <h1>Wandering Worlds</h1>
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
        {#if role === UserRole.WRITER}
          <li>
            <a
              class:active={active === RoutePath.Create}
              href={RoutePath.Create}>Create</a
            >
          </li>
        {/if}
        {#if role === UserRole.ADMIN}
          <li>
            <a
              class:active={active === RoutePath.Dashboard}
              href={RoutePath.Dashboard}>Dashboard</a
            >
          </li>
        {/if}

        <div class="auth">
          {#if !$page.data.user}
            <li>
              <a class="login" href="/auth/login">Login</a>
            </li>
            <li>
              <a class="register" href="/auth/register">Register</a>
            </li>
          {:else}
            <li>
              <form method="POST">
                <button formaction="/auth/logout" type="submit">Log out</button>
              </form>
            </li>
          {/if}
        </div>
      </ul>
    </nav>
  </Container>
</div>

<style>
  .container-wrapper {
    background-color: white;
    z-index: 9999;

    position: sticky;

  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--sp-base) var(--sp-lg);

    border-bottom: 1px solid var(--l-75);

    &.flex-nav {
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }

  ul {
    display: flex;
    gap: 1rem;
    line-height: 50px;
    width: 100%;

    justify-content: center;
    align-items: center;

    & .auth {
      justify-content: center;
      align-items: center;
      display: flex;
      border-radius: 15px;

      & a {
        &:hover {
          background-color: var(--a-50) ;
        }
      }
    }
  }

  a {
    font-size: var(--fs-sm-xl);
  }

  .active {
    color: var(--a);
  }

  h1 {
    transition: var(--med);
    text-decoration:  underline;
    font-weight: 400;
  }

  h1,
  li {
    font-family: var(--font-t);
  }
  h1::first-letter {
    font-size: 55px;
    color: var(--a);
    font-weight: bold;
  }

  a.login,
  a.register,
  button {
    font-family: var(--font-t);
    background-color: var(--a);
    color: white;
    border-radius: 15px;
  }
  button {
    font-size: var(--fs-sm-xl);
  }

  a.register {
    background-color: var(--p);
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
