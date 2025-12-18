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
  class="p-5 grid rounded mx-auto my-auto h-full w-full bg-violet-100"
  style="grid-template-columns: repeat({width}, minmax(0, 1fr)); grid-template-rows: repeat({heigth}, minmax(0, 1fr));"
  method="POST"
  use:enhance
>

  {#each placedPlants as cell, index}
    <button
      type={editMode === "shovel" ? "submit" : "button"}
      onclick={() => {
        editMode === "shovel" ? null : openMenu(index);
      }}
      class="border border-violet-400 text-sm"
      formaction="?/disableCell"
      style={shapeArray.includes(index) ? "background-color: #FFFFFF;" : ""}
      disabled={shapeArray.includes(index) && editMode === "planter"}
      name="cellIndex"
      value={index}
    >
      {#if cell.plant}
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
