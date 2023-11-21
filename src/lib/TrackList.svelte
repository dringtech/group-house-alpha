<script>
  export let tracks;
</script>

<ul>
  {#each tracks as t (t.id) }
    <li><a href="/track/{t.id}">{ t.name }</a>
  {/each}
</ul>