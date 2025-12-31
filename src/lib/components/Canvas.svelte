<script lang="ts">
  import { enhance } from "$app/forms";
  import { gethabitIcon } from "$lib/habitIcon";
  import type { plantInfo } from "$lib/types";

  type canvasProps = {
    placedPlants: plantInfo[];
    shapeArray: number[];
    width: number;
    heigth: number;
    editMode: "shovel" | "planter";
    openMenu: (cellIndex: number) => void;
    // New optional prop for simulation results
    stressMap?: Record<number, number>;
  };

  let {
    placedPlants,
    width,
    heigth,
    editMode,
    shapeArray,
    openMenu,
    stressMap = {} // Default to empty object so it works in Builder
  }: canvasProps = $props();

  /**
   * Calculates a red overlay style based on the number of warnings.
   * Returns a CSS box-shadow string.
   */
  function getStressStyle(index: number): string {
    const count = stressMap[index] || 0;
    
    if (count === 0) return "";

    // Calculate intensity:
    // 1 warning = 0.25 opacity
    // 3+ warnings = max 0.75 opacity (so we can still see the plant)
    const opacity = Math.min(count * 0.25, 0.75);
    
    // We use a large spread radius (100px) to ensure the inset shadow covers the whole cell
    return `box-shadow: inset 0 0 0 100px rgba(220, 38, 38, ${opacity});`;
  }
</script>

<form
  class="p-5 grid rounded mx-auto my-auto h-full w-full bg-emerald-100"
  style="grid-template-columns: repeat({width}, minmax(0, 1fr)); grid-template-rows: repeat({heigth}, minmax(0, 1fr));"
  method="POST"
  use:enhance
>
  {#each placedPlants as cell, index}
    {@const isShovel = editMode === "shovel" ? true : false}
    {@const isBlocked = shapeArray.includes(index)}
    {@const stressStyle = getStressStyle(index)}

    <button
      formaction="?/disableCell"
      name="cellIndex"
      value={index}
      type={isShovel ? "submit" : "button"}
      onclick={() => (isShovel ? undefined : openMenu(index))}
      class="border border-green-900 text-sm relative transition-all duration-300"
      style="{isBlocked ? 'background-color: #0d542b;' : ''} {stressStyle}"
      disabled={isBlocked && !isShovel}
    >
      {#if cell.plant}
        <img
          src={gethabitIcon(cell.plant.habit)}
          alt={cell.plant.habit}
          title={cell.plant.commonName}
          class="w-full h-full object-contain pointer-events-none"
        />
      {/if}
    </button>
  {/each}
</form>
