<script>
  export let data;
  $: ({ id, track } = data);
</script>

<h1>{ track.name }</h1>
<p>{ track.created_at }</p>

<div>{ track.notes }</div>