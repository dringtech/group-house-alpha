<script>
  import RecordingUploader from "$lib/RecordingUploader.svelte";

  export let data;
  $: ({ id, track, supabase } = data);
</script>

<h1>{ track.name }</h1>
<p>{ track.created_at }</p>

<div>{ track.notes }</div>

<RecordingUploader trackId={track.id} {supabase}/>