<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js'
	import { createEventDispatcher } from 'svelte'

  import { v4 as uuidv4 } from 'uuid';

  export let trackId: string;
	export let supabase: SupabaseClient

	let uploading = false
	let files: FileList

	const dispatch = createEventDispatcher()

	const uploadRecording = async () => {
		try {
			uploading = true
      const { data: { session } } = await supabase.auth.getSession()

			if (!files || files.length === 0) {
				throw new Error('You must select a recording to upload.')
			}

			const file = files[0]
			const fileExt = file.name.split('.').pop()

      const filePath = `${session.user.id}/${uuidv4()}.${fileExt}`

      {
        const { error } = await supabase.storage.from('recordings').upload(filePath, file)
        if (error) {
          throw error
        }
      }

      {
        const { error } = await supabase.from('recordings').insert({
          owner: session.user.id,
          media_path: filePath,
          track_id: trackId,
        })
        if (error) {
          throw error
        }
      }

			setTimeout(() => {
				dispatch('upload')
			}, 100)
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			uploading = false
		}
	}
</script>

<div>
	<div>
		<label class="button primary block" for="single">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="audio/*"
			bind:files
			on:change={uploadRecording}
			disabled={uploading}
		/>
	</div>
</div>