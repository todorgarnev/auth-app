<script lang="ts">
  import { enhance, applyAction } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<h1>Register</h1>

<form
  action="?/register"
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

  {#if form?.user}
    <p>Username is taken</p>
  {/if}

  <button type="submit">Register</button>
</form>
