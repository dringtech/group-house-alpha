<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js'

	export let url: string
	export let supabase: SupabaseClient

	let recordingUrl: string | null = null

	const downloadRecording = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('recordings').download(path)

			if (error) {
				throw error
			}

			const url = URL.createObjectURL(data)
			recordingUrl = url
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading recording: ', error.message)
			}
		}
	}

	$: if (url) downloadRecording(url)
</script>

<style>
  audio {
    width: 100%;
  }
</style>

<div>
	{#if recordingUrl}
    <audio controls src="{ recordingUrl }">
      <a href="{ recordingUrl }">Download audio</a>
    </audio>
	{:else}
		<div class="recording missing">Recording is missing!</div>
	{/if}
</div>