<script lang="ts">
  import type { PageProps } from "./$types";
  import Canvas from "$lib/components/Canvas.svelte";
  import { Button } from "bits-ui";
  import { getUniqueMessagesForLocation, getStressLevels } from "$lib/simulationUtils";
  import { fade, fly } from "svelte/transition";

  let { data }: PageProps = $props();

  let activeCellIndex: number | null = $state(null);

  // Calculate stress levels (count of warnings per cell)
  let stressMap = $derived.by(() => {
    if (data.simulationResults && 'warnings' in data.simulationResults) {
      return getStressLevels(data.simulationResults.warnings);
    }
    return {};
  });

  // Calculate messages for the popup
  let currentMessages = $derived.by(() => {
    const results = data.simulationResults;
    if (activeCellIndex === null || !results || !('warnings' in results)) return [];
    return getUniqueMessagesForLocation(results.warnings, activeCellIndex);
  });

  function handleCellClick(cellIndex: number) {
    const cellHasPlant = data.placedPlants[cellIndex]?.plant;
    if (cellHasPlant) {
      activeCellIndex = cellIndex;
    } else {
      activeCellIndex = null;
    }
  }

  function closePopup() {
    activeCellIndex = null;
  }
</script>

<div class="h-4/5 w-4/5 mx-auto my-auto rounded relative flex flex-col">
  <div class="flex justify-between items-center pb-4">
    <h1 class="text-2xl font-bold text-emerald-800">Simulatie Resultaten</h1>
    <a href="/builder" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
      Terug naar Ontwerp
    </a>
  </div>

  <div class="relative flex-grow border-2 border-emerald-100 rounded-lg overflow-hidden bg-white shadow-sm">
    <Canvas
      editMode="planter"
      surfaceArea={data.surfaceArea}
      shapeArray={data.shapeArray}
      placedPlants={data.placedPlants}
      width={data.width}
      heigth={data.heigth}
      openMenu={handleCellClick}
      stressMap={stressMap} 
    />

    {#if activeCellIndex !== null}
      <div 
        role="button"
        tabindex="0"
        class="absolute inset-0 bg-black/20 z-10 backdrop-blur-[1px]"
        onclick={closePopup}
        onkeydown={(e) => e.key === 'Escape' && closePopup()}
        transition:fade={{ duration: 200 }}
      ></div>

      <div 
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-h-[80%] bg-white rounded-xl shadow-2xl z-20 flex flex-col overflow-hidden border border-emerald-200"
        transition:fly={{ y: 20, duration: 300 }}
      >
        <div class="bg-emerald-600 p-4 flex justify-between items-center">
          <h2 class="text-white font-bold text-lg">
            {data.placedPlants[activeCellIndex]?.plant?.nlName || "Plant"} Resultaten
          </h2>
          <button onclick={closePopup} class="text-emerald-100 hover:text-white transition-colors">✕</button>
        </div>

        <div class="p-6 overflow-y-auto flex-grow">
          {#if currentMessages.length > 0}
            <div class="space-y-4"> <!-- deze houden we omdat er mogelijk dingen zoals zon bij komen -->
              <div>
                <h3 class="font-bold text-gray-700 mb-2 border-b border-gray-200 pb-1">Wind</h3>
                <ul class="list-disc pl-5 space-y-1">
                  {#each currentMessages as msg}
                    <li class="text-gray-600 text-sm leading-relaxed">{msg}</li>
                  {/each}
                </ul>
              </div>
            </div>
          {:else}
            <div class="text-center py-8 text-gray-400 italic">Geen meldingen voor deze plant.</div>
          {/if}
        </div>

        <div class="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
          <Button.Root onclick={closePopup} class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded shadow-sm transition-all">Sluiten</Button.Root>
        </div>
      </div>
    {/if}
  </div>
</div>