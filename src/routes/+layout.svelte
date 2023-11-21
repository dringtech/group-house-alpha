<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import AuthLogout from '$lib/AuthLogout.svelte';

	export let data;

	let { supabase, session, userDetails } = data;
	$: ({ supabase, session, userDetails } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Group House</title>
</svelte:head>

<header>
	<div class="main-flow">
		<div class="site-title"><a href="/">Group House</a></div>
		{#if session}
			<div>
				<a href="/account">
					{ userDetails.username }
				</a>
			</div>
			<div>
				<AuthLogout />
			</div>
		{/if}
	</div>
</header>

<main class="main-flow">
	<slot />
</main>
