<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<h1>Log in</h1>

<form
  action="?/login"
  method="POST"
  use:enhance={() => {
    return async ({ result }) => {
      invalidateAll();
      await applyAction(result);
    };
  }}
>
  <div>
    <label for="username">Username</label>
    <input id="username" name="username" type="text" required />
  </div>

  <div>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required />
  </div>

  {#if form?.invalid}
    <p>Username and password is required.</p>
  {/if}

  {#if form?.credentials}
    <p>You have entered the wrong credentials.</p>
  {/if}

  <button type="submit">Log in</button>
</form>
