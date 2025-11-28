<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";
  import BuilderMenu from "./components/BuilderMenu.svelte";
  import ErrorInvalidInput from "./components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "./components/Error_MissingData.svelte";
  import { gethabitIcon } from "$lib/habitIcon";

  let { data, form }: PageProps = $props();

  function openPlantMenu(index: number) {
  }
</script>

<div class="h-4/5 w-4/5 mx-auto my-auto bg-violet-50 rounded">
  <BuilderMenu />

  {#if form?.missing}
    <ErrorMissingData />
  {/if}

  {#if form?.incorrect}
    <ErrorInvalidInput />
  {/if}

  <form
    class="p-5 grid rounded mx-auto my-auto h-full w-full bg-violet-100"
    style="grid-template-columns: repeat({data.width}, minmax(0, 1fr)); grid-template-rows: repeat({data.heigth}, minmax(0, 1fr));"
    method="POST"
    action="?/addPlant"
    use:enhance
  >
    {#each data.canvas as cell, index}
      <button
        type="submit"
        name="cellIndex"
        value={index}
        onclick={() => openPlantMenu(index)}
        class="border border-violet-400 text-sm flex items-center justify-center p-1 overflow-hidden bg-white/50 hover:bg-white/80 transition-colors"
        disabled={cell.isPopulated}
      >
        {#if cell.isPopulated && cell.plant}
           <img 
             src={gethabitIcon(cell.plant.habit)} 
             alt={cell.plant.habit}
             title={cell.plant.commonName}
             class="w-full h-full object-contain"
           />
        {:else}
           <span class="text-violet-400 font-bold opacity-50">+</span>
        {/if}
      </button>
    {/each}
  </form>
</div>