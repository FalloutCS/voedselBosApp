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
  };

  let {
    placedPlants,
    width,
    heigth,
    editMode,
    shapeArray,
    openMenu,
  }: canvasProps = $props();
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

    <button
      formaction="?/disableCell"
      name="cellIndex"
      value={index}
      type={isShovel ? "submit" : "button"}
      onclick={() => (isShovel ? undefined : openMenu(index))}
      class="border border-green-900 text-sm"
      style={isBlocked ? "background-color: #0d542b;" : ""}
      disabled={isBlocked && !isShovel}
    >
      {#if cell.plant}
        <img
          src={gethabitIcon(cell.plant.habit)}
          alt={cell.plant.habit}
          title={cell.plant.commonName}
          class="w-full h-full object-contain"
        />
      {/if}
    </button>
  {/each}
</form> 
