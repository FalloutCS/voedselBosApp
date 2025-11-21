<script lang="ts">
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>


<!-- 
<div
  class="w-4/5 h-4/5 bg-violet-100 grid grid-cols-10 grid-rows-10 mx-auto my-auto p-10"
>
  {#each mijnVoedselbos.canvas as cell}
    {#if cell.isPopulated}
        <div class=" bg-violet-600 border border-violet-950">{cell.plant?.name}</div>
    {/if}
    <div class=" bg-violet-200 border border-violet-950"></div>
  {/each}
</div> -->
