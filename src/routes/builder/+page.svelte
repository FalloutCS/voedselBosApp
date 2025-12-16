<script lang="ts">
  import type { PageProps } from "./$types";
  import Canvas from "$lib/components/Canvas.svelte";
  import ErrorInvalidInput from "$lib/components/Error_Invalid_Input.svelte";
  import ErrorMissingData from "$lib/components/Error_MissingData.svelte";
  import { type SubmitFunction } from "@sveltejs/kit";
  import PlantMenu from "$lib/components/PlantMenu.svelte";
  import ActionMenu from "$lib/components/ActionMenu.svelte";
  import { enhance } from "$app/forms";
  import type { menuMode } from "$lib/types";
  import Toolbar from "./components/Toolbar.svelte";

  let { data, form }: PageProps = $props();
  let menuState: menuMode = $state("");
  let activeCellIndex: number = $state(0);
  let editMode: "shovel" | "planter" = $state("shovel");

  // Helper om de naam van de plant op te halen
  let selectedPlantName = $derived(
    data.placedPlants[activeCellIndex]?.plant?.commonName || "Plant",
  );

  // Waits for the browser to finish updating before closing the menu
  const handlePlantSubmission: SubmitFunction = () => {
    return async ({ update }) => {
      await update();
      menuState = "";
    };
  };

  function handleCellClick(cellIndex: number) {
    if (editMode === "shovel") {
      console.log(`Adding ${cellIndex} to forbidden array`);
    }
    if (editMode === "planter") {
      activeCellIndex = cellIndex;
      const cellHasPlant = data.placedPlants[cellIndex].plant;
      cellHasPlant ? (menuState = "") : (menuState = "plantMenu");
    }
  }
</script>

<div class="h-4/5 w-4/5 mx-auto my-auto rounded relative flex flex-col">
  <div class="flex justify-between items-center pb-2">
    <Toolbar bind:editMode />

    <form method="POST" use:enhance>
      <button type="submit" formaction="?/uploadSim"> Simuleer </button>
    </form>
  </div>

  {#if form?.missing}
    <ErrorMissingData />
  {/if}

  {#if menuState === "plantMenu"}
    <PlantMenu
      {handlePlantSubmission}
      {activeCellIndex}
      {data}
      closeMenu={() => {
        menuState = "";
      }}
    />
  {:else if menuState === "actionMenu"}
    <ActionMenu
      plantName={selectedPlantName}
      cellIndex={activeCellIndex}
      onEdit={() => {
        menuState = "plantMenu";
      }}
      onClose={() => {
        menuState = "";
      }}
      handleSubmission={handlePlantSubmission}
    />
  {:else}
    <Canvas
      placedPlants={data.placedPlants}
      width={data.width}
      heigth={data.heigth}
      openMenu={handleCellClick}
    />
  {/if}
</div>
