<script lang="ts">
  import { enhance } from "$app/forms";
  import { gethabitIcon } from "$lib/habitIcon";
  import type { PlacedPlant } from "$lib/types";
  type canvasProps = {
    placedPlants: PlacedPlant;
    surfaceArea: number;
    shapeArray: number[];
    width: number;
    height: number;
    editMode: "shovel" | "planter";
    openMenu: (cellIndex: number) => void;
    stressMap?: Record<number, number>;
  };

  let {
    placedPlants,
    width,
    height,
    editMode,
    shapeArray,
    surfaceArea,
    openMenu,
    stressMap = {} 
  }: canvasProps = $props();


  function getStressStyle(index: number): string {
    const count = stressMap[index] || 0;

    if (count === 0) return "";
    
    const opacity = Math.min(count * 0.10, 0.80);
    
    return `box-shadow: inset 0 0 0 100px rgba(220, 38, 38, ${opacity});`;
  }
</script>

<form
  class="p-5 grid rounded mx-auto my-auto h-full w-full bg-emerald-100"
  style="grid-template-columns: repeat({width}, minmax(0, 1fr)); grid-template-rows: repeat({height}, minmax(0, 1fr));"
  method="POST"
  use:enhance
>
  {#each { length: surfaceArea }, index}
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
      {#if placedPlants[index] && placedPlants[index].plant}
        <img
          src={gethabitIcon(placedPlants[index].plant.habit)}
          alt={placedPlants[index].plant.habit}
          title={placedPlants[index].plant.commonName}
          class="w-full h-full object-contain pointer-events-none"
        />
      {/if}
    </button>
  {/each}
</form>
