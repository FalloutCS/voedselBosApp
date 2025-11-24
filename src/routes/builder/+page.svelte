<script lang="ts">
  import { enhance } from "$app/forms";
  import type { voedselbos_Cel } from "$lib/types";
  import type { PageProps } from "./$types";
  import { invalidate } from "$app/navigation";
  let { data }: PageProps = $props();
  let canvas: voedselbos_Cel[] = $state(data.canvas);
  let width: number = $state(data.width);
  let heigth: number = $state(data.heigth);
</script>


<form
  class="w-4/5 h-4/5 mx-auto my-auto p-10 bg-violet-100 grid"
  style="grid-template-columns: repeat({width}, minmax(0, 1fr)); grid-template-rows: repeat({heigth}, minmax(0, 1fr));"
  method="POST"
>
  {#each canvas as cell, index}
    <button
      type="submit"
      name="cellIndex" 
      value={index}
      formaction="?/addPlant"
      class="border border-violet-950 text-sm"
      class:bg-violet-600={cell.isPopulated}
      class:bg-violet-200={!cell.isPopulated}
      disabled={cell.isPopulated}
    >
      {#if cell.isPopulated}
        {cell.plant?.name}
      {:else}
        +
      {/if}
    </button>
  {/each}
</form>
