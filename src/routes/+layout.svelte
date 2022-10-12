<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Sveltekit Auth</title>
</svelte:head>

<nav class="nav">
  {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}

  {#if $page.data.user}
    <a href="/admin">admin</a>

    <form action="/logout" method="POST">
      <button type="submit">Log out</button>
    </form>
  {/if}
</nav>

<main>
  <slot />
</main>


<style>
  .nav {
    display: flex;
    justify-content: space-between;
    width: 10rem;
  }
</style>