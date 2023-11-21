<script lang="ts">
	import { enhance } from '$app/forms';

	let loading = false;
	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<form method="post" action="/auth/logout" use:enhance={handleSignOut}>
	<div>
		<button class="button" disabled={loading}>Sign Out</button>
	</div>
</form>
