<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<form method="POST">
  <label for="name">Forest name:</label>
  <input id="name" type="text" name="name" class="border" required />
  <label for="location">Forest location:</label>
  <input id="location" type="text" name="location" class="border" required />
  <label for="width">Total Width (m)</label>
  <input id="width" name="width" type="number" class="border" />
  <label for="heigth">Total heigth (m)</label>
  <input id="heigth" name="heigth" type="number" class="border" />
  <button type="submit" formaction="?/create">Maak</button>
</form>
