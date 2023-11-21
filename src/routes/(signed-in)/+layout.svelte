<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import { enhance } from '$app/forms';

  export let data;

  const profile = writable();

  $: profile.set(data.profile)

  let loading = false
  const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	};
</script>

<p>
  Logged in as <a href="/account">{$profile.username}</a>
</p>

<form method="post" action="/auth/logout" use:enhance={handleSignOut}>
  <div>
    <button class="button" disabled={loading}>Sign Out</button>
  </div>
</form>

<slot/>
