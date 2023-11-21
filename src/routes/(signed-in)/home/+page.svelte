<script>
  import TrackList from "$lib/TrackList.svelte";

  export let data;
  $: ({ tracks } = data);
</script>
<p>
  Home
</p>

<h1>Tracks </h1>
<p><a href="/track/add">+ Add a track</a></p>
<TrackList {tracks} />
