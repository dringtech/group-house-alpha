<script lang="ts">
  import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

  let loading=false;

  const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}
</script>
<h1>Add a track</h1>
<form
  method='POST'
  >
  <div>
    <label for="name">Track name</label>
    <input id="name" type="text" name="name"/>
  </div>
  <div>
    <label for="notes">Notes</label>
    <textarea id="name" name="notes" rows="10"/>
  </div>
  <div>
    <input
      type="submit"
      class="primary"
      value={loading ? 'Loading...' : 'Update'}
      disabled={loading}
    >
  </div>
</form>