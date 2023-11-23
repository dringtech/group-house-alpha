<script>
  import { onMount } from 'svelte';
  import Recording from "$lib/Recording.svelte";
  import RecordingUploader from "$lib/RecordingUploader.svelte";

  export let data;
  $: ({ id, track, supabase } = data);

  const selectRecordings = async () => {
    const { error, data } = await supabase
      .from('recordings')
      .select('id, media_path, created_at')
      .eq('track_id', track.id);
    if (error) throw error;
    return data;
  }

  let getRecordings = [];
  function refreshRecordings() {
    getRecordings = selectRecordings()
  }
  onMount(() => {
    refreshRecordings();
  })
</script>

<h1>{ track.name }</h1>
<p>{ track.created_at }</p>

<div>{ track.notes }</div>

<h2>Recordings</h2>
{#await getRecordings}
  <p>Loading recordings...</p>
{:then recordings}
  {#each recordings as recording (recording.id)}
    <Recording url={recording.media_path} {supabase}/>
  {/each}
{/await}

<RecordingUploader trackId={track.id} {supabase} on:upload={ refreshRecordings }/>